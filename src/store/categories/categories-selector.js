import { createSelector } from "reselect";


const selectCategoryReducer = (state) => state.categories;

export const selectCategoriesMap = createSelector(
    [selectCategoryReducer],
    (categoriesReducer) => categoriesReducer.categoriesMap
)

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesReducer) => categoriesReducer.isLoading
)