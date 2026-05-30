const { groups } = window.MILK_TEA_LAB_INGREDIENTS;
const recipeEngine = window.MILK_TEA_LAB_RECIPE_ENGINE;
const { evaluateCup } = window.MILK_TEA_LAB_TASTE_JUDGE;
const saveStorage = window.MILK_TEA_LAB_SAVE_STORAGE;
const categoryByName = new Map(groups.flatMap(group => group.items.map(item => [item, group.name])));

const state = {
  cup: [],
  lastResult: null
};

const el = {
  groups: document.querySelector("#ingredient-groups"),
  ingredientCount: document.querySelector("#ingredient-count"),
  cupList: document.querySelector("#cup-list"),
  totalRatio: document.querySelector("#total-ratio"),
  cupTitle: document.querySelector("#cup-title"),
  cupNote: document.querySelector("#cup-note"),
  visualFill: document.querySelector(".visual-fill"),
  visualToppings: document.querySelector("#visual-toppings"),
  tasteBtn: document.querySelector("#taste-btn"),
  randomBtn: document.querySelector("#random-btn"),
  balanceBtn: document.querySelector("#balance-btn"),
  clearBtn: document.querySelector("#clear-btn"),
  saveBtn: document.querySelector("#save-btn"),
  savedBtn: document.querySelector("#saved-btn"),
  result: document.querySelector("#result"),
  resultEmpty: document.querySelector("#result-empty"),
  scorePill: document.querySelector("#score-pill"),
  drinkType: document.querySelector("#drink-type"),
  scoreValue: document.querySelector("#score-value"),
  feedback: document.querySelector("#feedback"),
  audienceTags: document.querySelector("#audience-tags"),
  attributeBars: document.querySelector("#attribute-bars"),
  savedDialog: document.querySelector("#saved-dialog"),
  savedList: document.querySelector("#saved-list"),
  closeSaved: document.querySelector("#close-saved")
};

const app = {
  groups,
  categoryByName,
  state,
  el,
  recipeEngine,
  evaluateCup,
  saveStorage
};

app.ui = window.MILK_TEA_LAB_RENDER.createRenderer(app);
app.events = window.MILK_TEA_LAB_EVENTS.bindDomEvents(app);

app.ui.renderIngredients();
app.ui.render();
