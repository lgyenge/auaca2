/*!
 * Copyright © 2005-2023 Hyland Software, Inc. and its affiliates. All rights reserved.
 *
 * Alfresco Example Content Application
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail. Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * from Hyland Software. If not, see <http://www.gnu.org/licenses/>.
 */

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuCategoryData } from '../reducers/au-category.reducer';
import * as fromAuCategories from '../reducers/au-category.reducer';
// import { AuPage } from '../models/au-templates.model';
// import { AuCategory } from '../public-api';
// import { Node } from '@alfresco/js-api';

// Lookup the 'Categories' feature state managed by NgRx
const selectState = createFeatureSelector<AuCategoryData>(fromAuCategories.auCategoriesFeatureKey);

// export const selectCategoriesLoaded = createSelector(selectState, (state: State) => state.loaded);

// export const selectCategoriesError = createSelector(selectState, (state: State) => state.error);
// selectIds, selectEntities, selectAll, selectTotal
export const getAuCategoriesAll = createSelector(selectState, (state: AuCategoryData) => fromAuCategories.selectAll(state));
export const getAuCategoriesIds = createSelector(selectState, (state: AuCategoryData) => fromAuCategories.selectIds(state));

export const getAuCategoriesEntities = createSelector(selectState, (state: AuCategoryData) => fromAuCategories.selectEntities(state));

// export const getSelectedId = createSelector(selectState, (state: State) => state.selectedId);

/* export const getEntity = createSelector(selectCategoriesEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
); */
/*
export const auCategoryQuery = {
  getAuCategoriesAll,
  getAuCategoriesEntities
  // getSelectedProductId,
  // getSelectedProduct,
}; */
// export const getAuCategoryLoaded = createSelector(selectState, (state: AuCategoryData) => state.loaded);

// const selectCategoriesLoaded = createSelector(selectState, (state) => state.loaded);
// export const selectCategoriesReady = createSelector(selectCategoriesLoaded, getAuCategoriesAll, (ready, pages) => ({ ready, pages }));

// export const getAuCategoriesOfPage = (props: { page: Node }) =>
// 👍 `count` knows that it's a number
/*   createSelector(selectState, (state: AuCategoryData) => {
    // props.page;
    const categories = fromAuCategories.selectAll(state);
    const newCategories = categories.filter((category) => category.parentId === props.page.id);
    if (state.loaded) {
      return newCategories;
    } else {
      return null;
    }
    // return categories;
  }); */

/* export const getAuCategoryIdsOfPage = (props: { page: Node }) =>
  createSelector(getAuCategoriesOfPage({ page: props.page }), (categories: Node[]) => {
    let Ids: string[] = [];
    Ids = categories.map((element) => element.id);
    // eslint-disable-next-line no-console
    console.log(`PageId:  ${props.page.id}  -  CategoryIdsOfPage:  ${Ids} `);
    return Ids;
  }); */

// export const getSelectedAuCategory = createSelector(selectState, (state: AuCategoryData) => state.selectedAuCategoryId);

/* export const getAuCategoryIdsOfPage = (props: { pageId: string }) =>
  // 👍 `count` knows that it's a number
  createSelector(selectState, (state: AuCategoryData) => {
    // eslint-disable-next-line no-console
    console.log(`PageId:  ${props.pageId} `);
    // props.page;
    const categories = fromAuCategories.selectAll(state);
    // eslint-disable-next-line no-console
    console.log(`Categories:  ${JSON.stringify(categories)} `);

    const newCategories = categories.filter((category) => category.parentId === props.pageId);
    // eslint-disable-next-line no-console
    console.log(`Categories of page:  ${JSON.stringify(newCategories)} `);

    let Ids: string[] = [];
    Ids = newCategories.map((element) => element.id);
    // eslint-disable-next-line no-console
    console.log(`CategoryIdsOfPage:  ${Ids} `);

    return Ids;
  }); */
