(function() {
const STORAGE_KEY = "milkTeaLabRecipes";

window.MILK_TEA_LAB_SAVE_STORAGE = {
  getRecipes() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  },

  setRecipes(recipes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  },

  deleteRecipe(id) {
    this.setRecipes(this.getRecipes().filter(item => item.id !== id));
  }
};
})();
