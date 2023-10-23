import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesReducer) => categoriesReducer.categoriesMap 
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categoriesMap) => categoriesMap
)