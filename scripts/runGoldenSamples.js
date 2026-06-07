const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.resolve(__dirname, "..");

const scriptFiles = [
  "utils/helpers.js",
  "data/ingredients.js",
  "core/ingredientRegistry.js",
  "data/ingredientTasteProfiles.js",
  "data/ingredientTextureProfiles.js",
  "data/ingredientFlavorProfiles.js",
  "data/combinationRules.js",
  "data/drinkTypeRules.js",
  "data/accidentRules.js",
  "data/structureAccidentRules.js",
  "data/proportionSegmentRules.js",
  "data/synergyRules.js",
  "data/feedbackTexts.js",
  "core/recipeEngine.js",
  "core/scoreEngine.js",
  "data/generated/feedbackTexts.generated.js",
  "core/feedbackRuntimeAdapter.js",
  "core/feedbackEngine.js",
  "core/tasteContext.js",
  "core/drinkStructureAnalyzer.js",
  "core/textureProfileAnalyzer.js",
  "core/ingredientAnalyzer.js",
  "core/ruleRefHelper.js",
  "core/ingredientGroupHelper.js",
  "core/proportionSegmentRuleEngine.js",
  "core/proportionAnalyzer.js",
  "core/accidentRuleEngine.js",
  "core/structureAccidentRuleEngine.js",
  "core/accidentAnalyzer.js",
  "core/combinationAnalyzer.js",
  "core/drinkTypeAnalyzer.js",
  "core/tasteSummaryEngine.js",
  "core/textureSummaryEngine.js",
  "core/flavorSummaryEngine.js",
  "core/summaryCandidateEngine.js",
  "core/candidatePriorityShellEngine.js",
  "core/generatedSeveritySuggestionEngine.js",
  "core/tasteJudge.js",
  "data/goldenSamples.js"
];

function createRuntime() {
  const math = Object.create(Math);
  math.random = () => 0;

  const context = {
    console,
    Math: math,
    module: { exports: {} }
  };
  context.globalThis = context;
  context.window = context;

  vm.createContext(context);

  scriptFiles.forEach(file => {
    const fullPath = path.join(repoRoot, file);
    const code = fs.readFileSync(fullPath, "utf8");
    vm.runInContext(code, context, { filename: file });
  });

  return context;
}

function includesAny(text, candidates = []) {
  return candidates.some(candidate => text.includes(candidate));
}

function checkIncludes(label, text, candidates, failures) {
  if (!candidates?.length) return;
  candidates.forEach(candidate => {
    if (!text.includes(candidate)) {
      failures.push(`${label} should include "${candidate}"`);
    }
  });
}

function checkIncludesAny(label, text, candidates, failures) {
  if (!candidates?.length) return;
  if (!includesAny(text, candidates)) {
    failures.push(`${label} should include one of: ${candidates.join(", ")}`);
  }
}

function checkForbidden(label, text, candidates, failures) {
  if (!candidates?.length) return;
  candidates.forEach(candidate => {
    if (text.includes(candidate)) {
      failures.push(`${label} should not include "${candidate}"`);
    }
  });
}

function getAccidentTypeIds(result) {
  const accidentTypeIds = [
    ...(Array.isArray(result?.accidentTypeIds) ? result.accidentTypeIds : []),
    ...(result?.accidentTypeId ? [result.accidentTypeId] : [])
  ];
  return [...new Set(accidentTypeIds.filter(Boolean))];
}

function getDrinkTypeIds(result) {
  const drinkTypeIds = [
    ...(Array.isArray(result?.drinkTypeIds) ? result.drinkTypeIds : []),
    ...(result?.drinkTypeId ? [result.drinkTypeId] : [])
  ];
  return [...new Set(drinkTypeIds.filter(Boolean))];
}

function getAudienceIds(result) {
  const audienceIds = [
    ...(Array.isArray(result?.audienceIds) ? result.audienceIds : []),
    ...(result?.audienceId ? [result.audienceId] : [])
  ];
  return [...new Set(audienceIds.filter(Boolean))];
}

function getOutcomeTypeIds(result) {
  const outcomeTypeIds = [
    ...(Array.isArray(result?.outcomeTypeIds) ? result.outcomeTypeIds : []),
    ...(result?.outcomeTypeId ? [result.outcomeTypeId] : [])
  ];
  return [...new Set(outcomeTypeIds.filter(Boolean))];
}

function getFeedbackTags(result) {
  const feedbackTags = [
    ...(Array.isArray(result?.feedbackTags) ? result.feedbackTags : []),
    ...(result?.feedbackTag ? [result.feedbackTag] : [])
  ];
  return [...new Set(feedbackTags.filter(Boolean))];
}

function getTasteSummary(result) {
  return result?.tasteSummary || null;
}

function getTextureSummary(result) {
  return result?.textureSummary || null;
}

function getFlavorSummary(result) {
  return result?.flavorSummary || null;
}

function getSummaryCandidates(result) {
  return result?.summaryCandidates || null;
}

function getCandidatePriorityShell(result) {
  return result?.candidatePriorityShell || null;
}

function getGeneratedFeedbackShadow(result) {
  return result?.generatedFeedbackShadow || null;
}

function getGeneratedSeveritySuggestion(result) {
  return result?.generatedSeveritySuggestion || null;
}

function formatIds(ids) {
  return `[${ids.join(", ")}]`;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function checkIdIncludes(label, actualIds, expectedIds, failures) {
  if (!expectedIds?.length) return;
  const missingIds = expectedIds.filter(id => !actualIds.includes(id));
  if (missingIds.length) {
    failures.push(`expected ${label} ${formatIds(expectedIds)} but got ${formatIds(actualIds)}`);
  }
}

function checkIdIncludesAny(label, actualIds, expectedIds, failures) {
  if (!expectedIds?.length) return;
  if (!expectedIds.some(id => actualIds.includes(id))) {
    failures.push(`expected ${label} to include one of ${formatIds(expectedIds)} but got ${formatIds(actualIds)}`);
  }
}

function checkForbiddenIds(label, actualIds, forbiddenIds, failures) {
  if (!forbiddenIds?.length) return;
  const matchedIds = forbiddenIds.filter(id => actualIds.includes(id));
  if (matchedIds.length) {
    failures.push(`expected ${label} not to include ${formatIds(forbiddenIds)} but got ${formatIds(actualIds)}`);
  }
}

function checkArrayIncludes(label, actualItems, expectedItems, failures) {
  if (!expectedItems?.length) return;
  const missingItems = expectedItems.filter(item => !actualItems.includes(item));
  if (missingItems.length) {
    failures.push(`expected ${label} to include ${formatIds(expectedItems)} but got ${formatIds(actualItems)}`);
  }
}

function checkArrayIncludesAny(label, actualItems, expectedItems, failures) {
  if (!expectedItems?.length) return;
  if (!expectedItems.some(item => actualItems.includes(item))) {
    failures.push(`expected ${label} to include one of ${formatIds(expectedItems)} but got ${formatIds(actualItems)}`);
  }
}

function checkForbiddenArrayIncludes(label, actualItems, forbiddenItems, failures) {
  if (!forbiddenItems?.length) return;
  const matchedItems = forbiddenItems.filter(item => actualItems.includes(item));
  if (matchedItems.length) {
    failures.push(`expected ${label} not to include ${formatIds(forbiddenItems)} but got ${formatIds(actualItems)}`);
  }
}

function checkTasteSummaryStructure(summary, failures) {
  if (!isPlainObject(summary?.values)) failures.push("tasteSummary.values should be an object");
  if (!Array.isArray(summary?.tags)) failures.push("tasteSummary.tags should be an array");
  if (!Array.isArray(summary?.risks)) failures.push("tasteSummary.risks should be an array");
  if (!Array.isArray(summary?.evidence)) failures.push("tasteSummary.evidence should be an array");
  if (!isPlainObject(summary?.metadata)) {
    failures.push("tasteSummary.metadata should be an object");
    return;
  }
  if (summary.metadata.readonly !== true) failures.push("tasteSummary.metadata.readonly should be true");
  if (summary.metadata.sourceLayer !== "taste") failures.push('tasteSummary.metadata.sourceLayer should be "taste"');
  if (summary.metadata.weightsEnabled !== false) failures.push("tasteSummary.metadata.weightsEnabled should be false");
}

function checkMetadataIncludes(actualMetadata, expectedMetadata, failures, label = "summary.metadata") {
  if (!expectedMetadata) return;
  Object.entries(expectedMetadata).forEach(([key, expectedValue]) => {
    if (actualMetadata?.[key] !== expectedValue) {
      failures.push(`${label}.${key} should be ${JSON.stringify(expectedValue)} but got ${JSON.stringify(actualMetadata?.[key])}`);
    }
  });
}

function evidenceMatches(actualEvidence, expectedEvidence) {
  return Object.entries(expectedEvidence).every(([key, expectedValue]) => actualEvidence?.[key] === expectedValue);
}

function checkEvidenceIncludesAny(actualEvidence, expectedCandidates, failures, label = "summary.evidence") {
  if (!expectedCandidates?.length) return;
  const matched = expectedCandidates.some(expectedEvidence =>
    actualEvidence.some(evidence => evidenceMatches(evidence, expectedEvidence))
  );
  if (!matched) {
    failures.push(`expected ${label} to include one of ${JSON.stringify(expectedCandidates)}`);
  }
}

function candidateMatches(actualCandidate, expectedCandidate) {
  return Object.entries(expectedCandidate).every(([key, expectedValue]) => {
    const actualValue = actualCandidate?.[key];

    if (Array.isArray(expectedValue)) {
      return Array.isArray(actualValue) && expectedValue.every(item => actualValue.includes(item));
    }

    if (isPlainObject(expectedValue)) {
      return isPlainObject(actualValue) && candidateMatches(actualValue, expectedValue);
    }

    return actualValue === expectedValue;
  });
}

function checkCandidateIncludesAny(actualCandidates, expectedCandidates, failures, label = "summaryCandidates.candidates") {
  if (!expectedCandidates?.length) return;
  const matched = expectedCandidates.some(expectedCandidate =>
    actualCandidates.some(candidate => candidateMatches(candidate, expectedCandidate))
  );
  if (!matched) {
    failures.push(`expected ${label} to include one of ${JSON.stringify(expectedCandidates)}`);
  }
}

function checkTasteSummaryExpectation(result, expectation, failures) {
  if (!expectation) return;

  const summary = getTasteSummary(result);
  if (expectation.exists === true && !summary) {
    failures.push("tasteSummary should exist");
    return;
  }
  if (!summary) return;

  if (expectation.exists === true) checkTasteSummaryStructure(summary, failures);

  const valueKeys = isPlainObject(summary.values) ? Object.keys(summary.values) : [];
  checkArrayIncludes("tasteSummary value keys", valueKeys, expectation.valueKeysInclude, failures);
  checkArrayIncludes("tasteSummary.tags", Array.isArray(summary.tags) ? summary.tags : [], expectation.tagIncludes, failures);
  checkArrayIncludesAny("tasteSummary.tags", Array.isArray(summary.tags) ? summary.tags : [], expectation.tagIncludesAny, failures);
  checkForbiddenArrayIncludes("tasteSummary.tags", Array.isArray(summary.tags) ? summary.tags : [], expectation.forbiddenTagIncludes, failures);
  checkArrayIncludes("tasteSummary.risks", Array.isArray(summary.risks) ? summary.risks : [], expectation.riskIncludes, failures);
  checkArrayIncludesAny("tasteSummary.risks", Array.isArray(summary.risks) ? summary.risks : [], expectation.riskIncludesAny, failures);
  checkForbiddenArrayIncludes("tasteSummary.risks", Array.isArray(summary.risks) ? summary.risks : [], expectation.forbiddenRiskIncludes, failures);
  checkMetadataIncludes(summary.metadata, expectation.metadataIncludes, failures, "tasteSummary.metadata");
  checkEvidenceIncludesAny(Array.isArray(summary.evidence) ? summary.evidence : [], expectation.evidenceIncludesAny, failures, "tasteSummary.evidence");
}

function checkTextureSummaryStructure(summary, failures) {
  if (!isPlainObject(summary?.values)) failures.push("textureSummary.values should be an object");
  if (!Array.isArray(summary?.tags)) failures.push("textureSummary.tags should be an array");
  if (!Array.isArray(summary?.risks)) failures.push("textureSummary.risks should be an array");
  if (!Array.isArray(summary?.evidence)) failures.push("textureSummary.evidence should be an array");
  if (!isPlainObject(summary?.metadata)) {
    failures.push("textureSummary.metadata should be an object");
    return;
  }
  if (summary.metadata.readonly !== true) failures.push("textureSummary.metadata.readonly should be true");
  if (summary.metadata.sourceLayer !== "texture") failures.push('textureSummary.metadata.sourceLayer should be "texture"');
  if (summary.metadata.weightsEnabled !== false) failures.push("textureSummary.metadata.weightsEnabled should be false");
}

function checkTextureSummaryExpectation(result, expectation, failures) {
  if (!expectation) return;

  const summary = getTextureSummary(result);
  if (expectation.exists === true && !summary) {
    failures.push("textureSummary should exist");
    return;
  }
  if (!summary) return;

  if (expectation.exists === true) checkTextureSummaryStructure(summary, failures);

  const valueKeys = isPlainObject(summary.values) ? Object.keys(summary.values) : [];
  checkArrayIncludes("textureSummary value keys", valueKeys, expectation.valueKeysInclude, failures);
  checkArrayIncludes("textureSummary.tags", Array.isArray(summary.tags) ? summary.tags : [], expectation.tagIncludes, failures);
  checkArrayIncludesAny("textureSummary.tags", Array.isArray(summary.tags) ? summary.tags : [], expectation.tagIncludesAny, failures);
  checkForbiddenArrayIncludes("textureSummary.tags", Array.isArray(summary.tags) ? summary.tags : [], expectation.forbiddenTagIncludes, failures);
  checkArrayIncludes("textureSummary.risks", Array.isArray(summary.risks) ? summary.risks : [], expectation.riskIncludes, failures);
  checkArrayIncludesAny("textureSummary.risks", Array.isArray(summary.risks) ? summary.risks : [], expectation.riskIncludesAny, failures);
  checkForbiddenArrayIncludes("textureSummary.risks", Array.isArray(summary.risks) ? summary.risks : [], expectation.forbiddenRiskIncludes, failures);
  checkMetadataIncludes(summary.metadata, expectation.metadataIncludes, failures, "textureSummary.metadata");
  checkEvidenceIncludesAny(Array.isArray(summary.evidence) ? summary.evidence : [], expectation.evidenceIncludesAny, failures, "textureSummary.evidence");
}

function checkFlavorSummaryStructure(summary, failures) {
  if (!isPlainObject(summary?.values)) failures.push("flavorSummary.values should be an object");
  if (!Array.isArray(summary?.tags)) failures.push("flavorSummary.tags should be an array");
  if (!Array.isArray(summary?.risks)) failures.push("flavorSummary.risks should be an array");
  if (!Array.isArray(summary?.evidence)) failures.push("flavorSummary.evidence should be an array");
  if (!isPlainObject(summary?.metadata)) {
    failures.push("flavorSummary.metadata should be an object");
    return;
  }
  if (summary.metadata.readonly !== true) failures.push("flavorSummary.metadata.readonly should be true");
  if (summary.metadata.sourceLayer !== "flavor") failures.push('flavorSummary.metadata.sourceLayer should be "flavor"');
  if (summary.metadata.weightsEnabled !== false) failures.push("flavorSummary.metadata.weightsEnabled should be false");
}

function checkFlavorSummaryExpectation(result, expectation, failures) {
  if (!expectation) return;

  const summary = getFlavorSummary(result);
  if (expectation.exists === true && !summary) {
    failures.push("flavorSummary should exist");
    return;
  }
  if (!summary) return;

  if (expectation.exists === true) checkFlavorSummaryStructure(summary, failures);

  const valueKeys = isPlainObject(summary.values) ? Object.keys(summary.values) : [];
  checkArrayIncludes("flavorSummary value keys", valueKeys, expectation.valueKeysInclude, failures);
  checkArrayIncludes("flavorSummary.tags", Array.isArray(summary.tags) ? summary.tags : [], expectation.tagIncludes, failures);
  checkArrayIncludesAny("flavorSummary.tags", Array.isArray(summary.tags) ? summary.tags : [], expectation.tagIncludesAny, failures);
  checkForbiddenArrayIncludes("flavorSummary.tags", Array.isArray(summary.tags) ? summary.tags : [], expectation.forbiddenTagIncludes, failures);
  checkArrayIncludes("flavorSummary.risks", Array.isArray(summary.risks) ? summary.risks : [], expectation.riskIncludes, failures);
  checkArrayIncludesAny("flavorSummary.risks", Array.isArray(summary.risks) ? summary.risks : [], expectation.riskIncludesAny, failures);
  checkForbiddenArrayIncludes("flavorSummary.risks", Array.isArray(summary.risks) ? summary.risks : [], expectation.forbiddenRiskIncludes, failures);
  checkMetadataIncludes(summary.metadata, expectation.metadataIncludes, failures, "flavorSummary.metadata");
  checkEvidenceIncludesAny(Array.isArray(summary.evidence) ? summary.evidence : [], expectation.evidenceIncludesAny, failures, "flavorSummary.evidence");
}

function checkSummaryCandidatesStructure(summaryCandidates, failures) {
  if (!Array.isArray(summaryCandidates?.candidates)) failures.push("summaryCandidates.candidates should be an array");
  if (!isPlainObject(summaryCandidates?.byType)) failures.push("summaryCandidates.byType should be an object");
  if (!isPlainObject(summaryCandidates?.metadata)) {
    failures.push("summaryCandidates.metadata should be an object");
    return;
  }
  if (summaryCandidates.metadata.readonly !== true) failures.push("summaryCandidates.metadata.readonly should be true");
  if (summaryCandidates.metadata.weightsEnabled !== false) failures.push("summaryCandidates.metadata.weightsEnabled should be false");
  if (summaryCandidates.metadata.affectsFinalResult !== false) failures.push("summaryCandidates.metadata.affectsFinalResult should be false");
}

function checkSummaryCandidatesExpectation(result, expectation, failures) {
  if (!expectation) return;

  const summaryCandidates = getSummaryCandidates(result);
  if (expectation.exists === true && !summaryCandidates) {
    failures.push("summaryCandidates should exist");
    return;
  }
  if (!summaryCandidates) return;

  if (expectation.exists === true) checkSummaryCandidatesStructure(summaryCandidates, failures);

  const candidates = Array.isArray(summaryCandidates.candidates) ? summaryCandidates.candidates : [];
  const byType = isPlainObject(summaryCandidates.byType) ? summaryCandidates.byType : {};
  const byTypeKeys = Object.keys(byType);

  checkArrayIncludes("summaryCandidates.byType keys", byTypeKeys, expectation.byTypeKeysInclude, failures);
  checkMetadataIncludes(summaryCandidates.metadata, expectation.metadataIncludes, failures, "summaryCandidates.metadata");

  if (typeof expectation.candidateCountMin === "number" && candidates.length < expectation.candidateCountMin) {
    failures.push(`summaryCandidates.candidates length ${candidates.length} is below ${expectation.candidateCountMin}`);
  }

  if (expectation.candidateTypeCountMin) {
    Object.entries(expectation.candidateTypeCountMin).forEach(([candidateType, minCount]) => {
      const actualCount = Array.isArray(byType[candidateType]) ? byType[candidateType].length : 0;
      if (actualCount < minCount) {
        failures.push(`summaryCandidates.byType.${candidateType} length ${actualCount} is below ${minCount}`);
      }
    });
  }

  checkCandidateIncludesAny(candidates, expectation.candidateIncludesAny, failures);
}

function checkCandidatePriorityShellStructure(shell, failures) {
  if (!Array.isArray(shell?.orderedCandidates)) failures.push("candidatePriorityShell.orderedCandidates should be an array");
  if (!isPlainObject(shell?.byPriorityBand)) failures.push("candidatePriorityShell.byPriorityBand should be an object");
  if (!isPlainObject(shell?.topCandidates)) failures.push("candidatePriorityShell.topCandidates should be an object");
  if (!isPlainObject(shell?.metadata)) {
    failures.push("candidatePriorityShell.metadata should be an object");
    return;
  }
  if (shell.metadata.readonly !== true) failures.push("candidatePriorityShell.metadata.readonly should be true");
  if (shell.metadata.weightsEnabled !== false) failures.push("candidatePriorityShell.metadata.weightsEnabled should be false");
  if (shell.metadata.affectsFinalResult !== false) failures.push("candidatePriorityShell.metadata.affectsFinalResult should be false");
}

function checkCandidatePriorityShellExpectation(result, expectation, failures) {
  if (!expectation) return;

  const shell = getCandidatePriorityShell(result);
  if (expectation.exists === true && !shell) {
    failures.push("candidatePriorityShell should exist");
    return;
  }
  if (!shell) return;

  if (expectation.exists === true) checkCandidatePriorityShellStructure(shell, failures);

  const orderedCandidates = Array.isArray(shell.orderedCandidates) ? shell.orderedCandidates : [];
  const byPriorityBand = isPlainObject(shell.byPriorityBand) ? shell.byPriorityBand : {};
  const priorityBandKeys = Object.keys(byPriorityBand);

  checkArrayIncludes("candidatePriorityShell.byPriorityBand keys", priorityBandKeys, expectation.priorityBandIncludes, failures);
  checkMetadataIncludes(shell.metadata, expectation.metadataIncludes, failures, "candidatePriorityShell.metadata");

  if (typeof expectation.orderedCandidateCountMin === "number" && orderedCandidates.length < expectation.orderedCandidateCountMin) {
    failures.push(`candidatePriorityShell.orderedCandidates length ${orderedCandidates.length} is below ${expectation.orderedCandidateCountMin}`);
  }

  checkCandidateIncludesAny(
    orderedCandidates,
    expectation.candidateIncludesAny,
    failures,
    "candidatePriorityShell.orderedCandidates"
  );
}

function checkGeneratedFeedbackShadowStructure(shadow, failures) {
  if (shadow?.enabled !== true) failures.push("generatedFeedbackShadow.enabled should be true");
  if (shadow?.mode !== "shadow") failures.push('generatedFeedbackShadow.mode should be "shadow"');
  if (shadow?.affectsFinalFeedback !== false) failures.push("generatedFeedbackShadow.affectsFinalFeedback should be false");
  if (shadow?.affectsFinalResult !== false) failures.push("generatedFeedbackShadow.affectsFinalResult should be false");
  if (shadow?.source !== "generatedFeedbackTexts") failures.push('generatedFeedbackShadow.source should be "generatedFeedbackTexts"');
  if (!Array.isArray(shadow?.candidates)) failures.push("generatedFeedbackShadow.candidates should be an array");
  if (shadow?.fallbackReason !== null && typeof shadow?.fallbackReason !== "string") {
    failures.push("generatedFeedbackShadow.fallbackReason should be null or string");
  }
  if (!isPlainObject(shadow?.metadata)) {
    failures.push("generatedFeedbackShadow.metadata should be an object");
    return;
  }
  if (shadow.metadata.readonly !== true) failures.push("generatedFeedbackShadow.metadata.readonly should be true");
  if (
    Object.prototype.hasOwnProperty.call(shadow.metadata, "generatedDataAvailable") &&
    typeof shadow.metadata.generatedDataAvailable !== "boolean"
  ) {
    failures.push("generatedFeedbackShadow.metadata.generatedDataAvailable should be boolean when present");
  }
  if (
    Object.prototype.hasOwnProperty.call(shadow.metadata, "adapterAvailable") &&
    typeof shadow.metadata.adapterAvailable !== "boolean"
  ) {
    failures.push("generatedFeedbackShadow.metadata.adapterAvailable should be boolean when present");
  }
}

function checkGeneratedFeedbackShadowExpectation(result, expectation, failures) {
  if (!expectation) return;

  const shadow = getGeneratedFeedbackShadow(result);
  if (expectation.exists === true && !shadow) {
    failures.push("generatedFeedbackShadow should exist");
    return;
  }
  if (!shadow) return;

  if (expectation.exists === true) checkGeneratedFeedbackShadowStructure(shadow, failures);

  const candidates = Array.isArray(shadow.candidates) ? shadow.candidates : [];
  checkMetadataIncludes(shadow.metadata, expectation.metadataIncludes, failures, "generatedFeedbackShadow.metadata");
  checkCandidateIncludesAny(candidates, expectation.candidateIncludesAny, failures, "generatedFeedbackShadow.candidates");

  if (typeof expectation.candidateCountMin === "number" && candidates.length < expectation.candidateCountMin) {
    failures.push(`generatedFeedbackShadow.candidates length ${candidates.length} is below ${expectation.candidateCountMin}`);
  }
}

function checkGeneratedSeveritySuggestionStructure(suggestion, result, failures) {
  if (suggestion?.schemaVersion !== "generatedSeveritySuggestion.v0.0.8.5") {
    failures.push('generatedSeveritySuggestion.schemaVersion should be "generatedSeveritySuggestion.v0.0.8.5"');
  }
  if (suggestion?.readonly !== true) failures.push("generatedSeveritySuggestion.readonly should be true");
  if (suggestion?.affectsFinalResult !== false) failures.push("generatedSeveritySuggestion.affectsFinalResult should be false");
  if (suggestion?.affectsScore !== false) failures.push("generatedSeveritySuggestion.affectsScore should be false");
  if (suggestion?.affectsFeedback !== false) failures.push("generatedSeveritySuggestion.affectsFeedback should be false");
  if (suggestion?.affectsResultType !== false) failures.push("generatedSeveritySuggestion.affectsResultType should be false");
  if (suggestion?.affectsGoldenExpected !== false) failures.push("generatedSeveritySuggestion.affectsGoldenExpected should be false");
  if (suggestion?.mode !== "ui_debug_suggestion") failures.push('generatedSeveritySuggestion.mode should be "ui_debug_suggestion"');
  if (!isPlainObject(suggestion?.scoreSuggestion)) {
    failures.push("generatedSeveritySuggestion.scoreSuggestion should be an object");
  } else {
    if (suggestion.scoreSuggestion.legacyScore !== result?.score) {
      failures.push(`generatedSeveritySuggestion.scoreSuggestion.legacyScore should be ${result?.score}`);
    }
    if (!Number.isFinite(suggestion.scoreSuggestion.suggestedScore)) {
      failures.push("generatedSeveritySuggestion.scoreSuggestion.suggestedScore should be a number");
    }
    if (
      Number.isFinite(suggestion.scoreSuggestion.suggestedScore)
      && (suggestion.scoreSuggestion.suggestedScore < 0 || suggestion.scoreSuggestion.suggestedScore > 100)
    ) {
      failures.push("generatedSeveritySuggestion.scoreSuggestion.suggestedScore should be between 0 and 100");
    }
    if (!Number.isFinite(suggestion.scoreSuggestion.scoreDelta)) {
      failures.push("generatedSeveritySuggestion.scoreSuggestion.scoreDelta should be a number");
    }
    if (!["low", "medium"].includes(suggestion.scoreSuggestion.confidence)) {
      failures.push('generatedSeveritySuggestion.scoreSuggestion.confidence should be "low" or "medium"');
    }
  }
  if (!Array.isArray(suggestion?.severityObservations)) {
    failures.push("generatedSeveritySuggestion.severityObservations should be an array");
  } else {
    suggestion.severityObservations.forEach((observation, index) => {
      if (observation?.affectsFinalResult === true) {
        failures.push(`generatedSeveritySuggestion.severityObservations[${index}].affectsFinalResult should not be true`);
      }
      if (observation?.officialSeverity === true) {
        failures.push(`generatedSeveritySuggestion.severityObservations[${index}].officialSeverity should not be true`);
      }
    });
  }
  if (!Array.isArray(suggestion?.metricAvailability)) {
    failures.push("generatedSeveritySuggestion.metricAvailability should be an array");
  }
  if (!Array.isArray(suggestion?.warnings)) {
    failures.push("generatedSeveritySuggestion.warnings should be an array");
  }
}

function checkGeneratedSeveritySuggestionExpectation(result, expectation, failures) {
  if (!expectation) return;

  const suggestion = getGeneratedSeveritySuggestion(result);
  if (expectation.exists === true && !suggestion) {
    failures.push("generatedSeveritySuggestion should exist");
    return;
  }
  if (!suggestion) return;

  if (expectation.exists === true) checkGeneratedSeveritySuggestionStructure(suggestion, result, failures);

  if (typeof expectation.metricAvailabilityCountMin === "number") {
    const count = Array.isArray(suggestion.metricAvailability) ? suggestion.metricAvailability.length : 0;
    if (count < expectation.metricAvailabilityCountMin) {
      failures.push(`generatedSeveritySuggestion.metricAvailability length ${count} is below ${expectation.metricAvailabilityCountMin}`);
    }
  }
}

function normalizeSampleItem(item, ingredientRegistry, sampleId) {
  if (item?.name) return { ...item };

  const ref = item?.ingredientRef || item?.ingredientId || item?.id;
  const meta = ingredientRegistry.normalizeIngredientRef(ref);

  if (!meta) {
    throw new Error(`sample ${sampleId} has unknown ingredient ref: ${JSON.stringify(item)}`);
  }

  return {
    ...item,
    name: meta.name,
    ingredientId: meta.id
  };
}

function normalizeSampleCup(sample, ingredientRegistry) {
  if (!Array.isArray(sample.cup)) {
    throw new Error(`sample ${sample.id} cup should be an array`);
  }

  return sample.cup.map(item => normalizeSampleItem(item, ingredientRegistry, sample.id));
}

function checkSample(sample, result) {
  const failures = [];
  const expectations = sample.expectations || {};
  const feedback = result?.feedback || "";
  const type = result?.type || "";
  const score = result?.score;
  const accidentTypeIds = getAccidentTypeIds(result);
  const drinkTypeIds = getDrinkTypeIds(result);
  const audienceIds = getAudienceIds(result);
  const outcomeTypeIds = getOutcomeTypeIds(result);
  const feedbackTags = getFeedbackTags(result);

  if (!result) {
    failures.push("evaluateCup returned null");
    return failures;
  }

  checkIncludes("type", type, expectations.typeIncludes, failures);
  checkIncludesAny("type", type, expectations.typeIncludesAny, failures);
  checkForbidden("type", type, expectations.forbiddenTypeIncludes, failures);
  checkIdIncludes("accidentTypeIdIncludes", accidentTypeIds, expectations.accidentTypeIdIncludes, failures);
  checkIdIncludesAny("accidentTypeIdIncludesAny", accidentTypeIds, expectations.accidentTypeIdIncludesAny, failures);
  checkForbiddenIds("forbiddenAccidentTypeIdIncludes", accidentTypeIds, expectations.forbiddenAccidentTypeIdIncludes, failures);
  checkIdIncludes("drinkTypeIdIncludes", drinkTypeIds, expectations.drinkTypeIdIncludes, failures);
  checkIdIncludesAny("drinkTypeIdIncludesAny", drinkTypeIds, expectations.drinkTypeIdIncludesAny, failures);
  checkForbiddenIds("forbiddenDrinkTypeIdIncludes", drinkTypeIds, expectations.forbiddenDrinkTypeIdIncludes, failures);
  checkIdIncludes("audienceIdIncludes", audienceIds, expectations.audienceIdIncludes, failures);
  checkIdIncludesAny("audienceIdIncludesAny", audienceIds, expectations.audienceIdIncludesAny, failures);
  checkForbiddenIds("forbiddenAudienceIdIncludes", audienceIds, expectations.forbiddenAudienceIdIncludes, failures);
  checkIdIncludes("outcomeTypeIdIncludes", outcomeTypeIds, expectations.outcomeTypeIdIncludes, failures);
  checkIdIncludesAny("outcomeTypeIdIncludesAny", outcomeTypeIds, expectations.outcomeTypeIdIncludesAny, failures);
  checkForbiddenIds("forbiddenOutcomeTypeIdIncludes", outcomeTypeIds, expectations.forbiddenOutcomeTypeIdIncludes, failures);
  checkIdIncludes("feedbackTagIncludes", feedbackTags, expectations.feedbackTagIncludes, failures);
  checkIdIncludesAny("feedbackTagIncludesAny", feedbackTags, expectations.feedbackTagIncludesAny, failures);
  checkForbiddenIds("forbiddenFeedbackTagIncludes", feedbackTags, expectations.forbiddenFeedbackTagIncludes, failures);
  checkIncludesAny("feedback", feedback, expectations.feedbackIncludesAny, failures);
  checkForbidden("feedback", feedback, expectations.feedbackForbiddenAny, failures);
  checkTasteSummaryExpectation(result, expectations.tasteSummary, failures);
  checkTextureSummaryExpectation(result, expectations.textureSummary, failures);
  checkFlavorSummaryExpectation(result, expectations.flavorSummary, failures);
  checkSummaryCandidatesExpectation(result, expectations.summaryCandidates, failures);
  checkCandidatePriorityShellExpectation(result, expectations.candidatePriorityShell, failures);
  checkGeneratedFeedbackShadowExpectation(result, expectations.generatedFeedbackShadow, failures);
  checkGeneratedSeveritySuggestionExpectation(result, expectations.generatedSeveritySuggestion, failures);

  if (typeof expectations.scoreMin === "number" && score < expectations.scoreMin) {
    failures.push(`score ${score} is below ${expectations.scoreMin}`);
  }
  if (typeof expectations.scoreMax === "number" && score > expectations.scoreMax) {
    failures.push(`score ${score} is above ${expectations.scoreMax}`);
  }

  return failures;
}

function main() {
  const runtime = createRuntime();
  const { evaluateCup } = runtime.MILK_TEA_LAB_TASTE_JUDGE;
  const ingredientRegistry = runtime.MILK_TEA_LAB_INGREDIENT_REGISTRY;
  const { goldenSamples } = runtime.MILK_TEA_LAB_GOLDEN_SAMPLES;

  let passed = 0;
  const failed = [];

  goldenSamples.forEach(sample => {
    let result = null;
    let failures = [];

    try {
      const cup = normalizeSampleCup(sample, ingredientRegistry);
      result = evaluateCup(cup);
      failures = checkSample(sample, result);
    } catch (error) {
      failures = [error.message];
    }

    const status = failures.length ? "FAIL" : "PASS";
    const summary = result ? `${result.type} / ${result.score}分` : "no result";

    console.log(`[${status}] ${sample.id} ${sample.name} - ${summary}`);
    if (failures.length) {
      failures.forEach(failure => console.log(`  - ${failure}`));
      failed.push({ sample, failures });
    } else {
      passed += 1;
    }
  });

  console.log("");
  console.log(`Golden samples: ${passed}/${goldenSamples.length} passed`);

  if (failed.length) {
    process.exitCode = 1;
  }
}

main();
