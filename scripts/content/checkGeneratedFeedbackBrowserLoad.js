#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const GENERATED_GLOBAL_NAME = "MILK_TEA_LAB_GENERATED_FEEDBACK_TEXTS";
const FORBIDDEN_GLOBALS = [
  "MILK_TEA_LAB_FEEDBACK_RUNTIME_ADAPTER",
  "MILK_TEA_LAB_FEEDBACK_TEXTS"
];
const REQUIRED_INDEXES = [
  "textsById",
  "textsByTag",
  "textsByScene",
  "enabledTextIdsByTag",
  "enabledTextIdsByScene"
];
const SAMPLE_TEXT_ID = "feedback_classic_001";
const CHINESE_RE = /[\u3400-\u9fff]/;

function usage() {
  console.log("Usage: node scripts/content/checkGeneratedFeedbackBrowserLoad.js <feedbackTexts.generated.js>");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function createBrowserLikeContext() {
  const context = {
    console: Object.freeze({
      log() {},
      warn() {},
      error() {}
    })
  };

  context.window = context;
  context.self = context;
  context.globalThis = context;

  return vm.createContext(context);
}

function loadAsBrowserScript(scriptPath) {
  const context = createBrowserLikeContext();
  const code = fs.readFileSync(scriptPath, "utf8");

  vm.runInContext(code, context, { filename: scriptPath });

  return context;
}

function main() {
  const [, , modulePath] = process.argv;

  if (!modulePath) {
    usage();
    process.exitCode = 1;
    return;
  }

  try {
    const resolvedModulePath = path.resolve(modulePath);
    const context = loadAsBrowserScript(resolvedModulePath);
    const generatedData = context[GENERATED_GLOBAL_NAME];
    const sampleText = generatedData?.textsById?.[SAMPLE_TEXT_ID];

    assert(isPlainObject(generatedData), "generated browser global object should exist");
    assert(context.window[GENERATED_GLOBAL_NAME] === generatedData, "window global should expose generated feedback data");
    assert(context.self[GENERATED_GLOBAL_NAME] === generatedData, "self global should expose generated feedback data");
    assert(context.globalThis[GENERATED_GLOBAL_NAME] === generatedData, "globalThis should expose generated feedback data");
    assert(Object.isFrozen(generatedData), "generated browser global object should be frozen");
    assert(typeof generatedData.schemaVersion === "string", "schemaVersion should exist");
    assert(generatedData.schemaVersion.startsWith("feedbackTexts.generated."), "schemaVersion should use generated feedback prefix");
    assert(generatedData.generatedFrom === "content_sheets/examples/feedback_texts.sample.csv", "generatedFrom should point to the human sheet source");

    REQUIRED_INDEXES.forEach(indexName => {
      assert(isPlainObject(generatedData[indexName]), `${indexName} should be an object`);
      assert(Object.isFrozen(generatedData[indexName]), `${indexName} should be frozen`);
    });

    assert(isPlainObject(generatedData.metadata), "metadata should be an object");
    assert(Object.isFrozen(generatedData.metadata), "metadata should be frozen");
    assert(generatedData.metadata.readonly === true, "metadata.readonly should be true");
    assert(generatedData.metadata.sourceType === "generated", "metadata.sourceType should be generated");
    assert(generatedData.metadata.stableIdRequired === true, "metadata.stableIdRequired should be true");
    assert(generatedData.metadata.affectsRuntime === false, "metadata.affectsRuntime should be false");
    assert(generatedData.metadata.generatedBy === "scripts/content/buildFeedbackData.js", "metadata.generatedBy should point to the build script");

    assert(sampleText?.textId === SAMPLE_TEXT_ID, `${SAMPLE_TEXT_ID} should be readable by stable textId`);
    assert(sampleText.feedbackTag === "classic", `${SAMPLE_TEXT_ID}.feedbackTag should be stable`);
    assert(sampleText.scene === "normal", `${SAMPLE_TEXT_ID}.scene should be stable`);
    assert(CHINESE_RE.test(sampleText.zhCN), `${SAMPLE_TEXT_ID}.zhCN should contain readable Chinese`);
    assert(generatedData.textsByTag.classic.includes(SAMPLE_TEXT_ID), `${SAMPLE_TEXT_ID} should be indexed by feedbackTag`);
    assert(generatedData.textsByScene.normal.includes(SAMPLE_TEXT_ID), `${SAMPLE_TEXT_ID} should be indexed by scene`);

    assert(typeof context.require === "undefined", "browser-like load should not rely on require");
    assert(typeof context.module === "undefined", "browser-like load should not rely on module");
    assert(typeof context.process === "undefined", "browser-like load should not rely on process");
    assert(typeof context.fetch === "undefined", "browser-like load should not rely on fetch");
    assert(typeof context.document === "undefined", "browser-like load should not rely on document");
    FORBIDDEN_GLOBALS.forEach(globalName => {
      assert(typeof context[globalName] === "undefined", `${globalName} should not be created by generated data module`);
    });

    console.log("Generated feedback browser load check passed");
    console.log(`Module: ${resolvedModulePath}`);
    console.log(`Global: ${GENERATED_GLOBAL_NAME}`);
    console.log(`Texts checked: ${Object.keys(generatedData.textsById).length}`);
    console.log("Runtime effects: no feedbackEngine or adapter globals created");
  } catch (error) {
    console.error(`Generated feedback browser load check failed: ${error.message}`);
    process.exitCode = 1;
  }
}

main();
