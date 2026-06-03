#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const GENERATED_GLOBAL_NAME = "MILK_TEA_LAB_GENERATED_FEEDBACK_TEXTS";
const SAMPLE_TEXT_ID = "feedback_classic_001";
const CHINESE_RE = /[\u3400-\u9fff]/;

function usage() {
  console.log("Usage: node scripts/content/checkGeneratedFeedbackDataModule.js <feedbackTexts.generated.js>");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readJsonPeer(jsPath) {
  const jsonPath = jsPath.replace(/\.js$/i, ".json");
  return {
    path: jsonPath,
    data: JSON.parse(fs.readFileSync(jsonPath, "utf8"))
  };
}

function loadGeneratedModule(jsPath) {
  const context = {
    console
  };
  context.window = context;
  context.globalThis = context;

  vm.createContext(context);
  const code = fs.readFileSync(jsPath, "utf8");
  vm.runInContext(code, context, { filename: jsPath });

  return context[GENERATED_GLOBAL_NAME];
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
    const generatedData = loadGeneratedModule(resolvedModulePath);
    const jsonPeer = readJsonPeer(resolvedModulePath);
    const sampleText = generatedData?.textsById?.[SAMPLE_TEXT_ID];

    assert(isPlainObject(generatedData), "generated JS global object should exist");
    assert(Object.isFrozen(generatedData), "generated JS global object should be frozen");
    assert(generatedData.schemaVersion === jsonPeer.data.schemaVersion, "schemaVersion should match generated JSON");
    assert(generatedData.generatedFrom === jsonPeer.data.generatedFrom, "generatedFrom should match generated JSON");
    assert(isPlainObject(generatedData.textsById), "textsById should be an object");
    assert(isPlainObject(generatedData.textsByTag), "textsByTag should be an object");
    assert(isPlainObject(generatedData.textsByScene), "textsByScene should be an object");
    assert(isPlainObject(generatedData.metadata), "metadata should be an object");
    assert(Object.isFrozen(generatedData.textsById), "textsById should be frozen");
    assert(Object.isFrozen(generatedData.metadata), "metadata should be frozen");
    assert(sampleText?.textId === SAMPLE_TEXT_ID, `${SAMPLE_TEXT_ID} should be queryable`);
    assert(CHINESE_RE.test(sampleText.zhCN), `${SAMPLE_TEXT_ID}.zhCN should contain readable Chinese`);
    assert(generatedData.metadata.readonly === true, "metadata.readonly should be true");
    assert(generatedData.metadata.sourceType === "generated", "metadata.sourceType should be generated");
    assert(generatedData.metadata.stableIdRequired === true, "metadata.stableIdRequired should be true");
    assert(generatedData.metadata.affectsRuntime === false, "metadata.affectsRuntime should be false");
    assert(JSON.stringify(generatedData) === JSON.stringify(jsonPeer.data), "generated JS data should match generated JSON");

    console.log("Generated feedback data module check passed");
    console.log(`Module: ${resolvedModulePath}`);
    console.log(`JSON peer: ${jsonPeer.path}`);
    console.log(`Global: ${GENERATED_GLOBAL_NAME}`);
    console.log(`Texts checked: ${Object.keys(generatedData.textsById).length}`);
  } catch (error) {
    console.error(`Generated feedback data module check failed: ${error.message}`);
    process.exitCode = 1;
  }
}

main();
