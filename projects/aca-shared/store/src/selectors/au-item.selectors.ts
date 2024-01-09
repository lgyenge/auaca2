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
import { AuItemData } from '../reducers/au-item.reducer';
import * as fromAuItems from '../reducers/au-item.reducer';
import { AuCategory } from '../models/au-category.model';
import { AuItem } from '../models/au-item.model';

// Lookup the 'Items' feature state managed by NgRx
const selectState = createFeatureSelector<AuItemData>(fromAuItems.auItemsFeatureKey);

// export const selectItemsLoaded = createSelector(selectState, (state: State) => state.loaded);

// export const selectItemsError = createSelector(selectState, (state: State) => state.error);
// selectIds, selectEntities, selectAll, selectTotal
export const getAuItemsAll = createSelector(selectState, (state: AuItemData) => fromAuItems.selectAll(state));
export const getAuItemsIds = createSelector(selectState, (state: AuItemData) => fromAuItems.selectIds(state));

export const getAuItemsEntities = createSelector(selectState, (state: AuItemData) => fromAuItems.selectEntities(state));

// export const getSelectedId = createSelector(selectState, (state: State) => state.selectedId);

/* export const getEntity = createSelector(selectItemsEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
); */

export const auItemQuery = {
  getAuItemsAll,
  getAuItemsEntities
  // getSelectedProductId,
  // getSelectedProduct,
};
export const getAuItemLoaded = createSelector(selectState, (state: AuItemData) => state.loaded);

/* export const getAuItemsOfCategories = (props: { category: AuCategory }) =>
  createSelector(selectState, (state: AuItemData) => {
    const items = fromAuItems.selectAll(state);
    return items.filter((item) => item.parentId === props.category.id);
  }); */

export const getAuItemsOfCategories = (props: { category: AuCategory }) =>
  // 👍 `count` knows that it's a number
  createSelector(selectState, (state: AuItemData) => {
    // props.page;
    const items = fromAuItems.selectAll(state);
    const newItems = items.filter((item) => item.parentId === props.category.id);
    if (state.loaded) {
      return newItems;
    } else {
      return null;
    }
    // return categories;
  });

export const getAuItemsIdsOfCategories = (props: { category: AuCategory }) =>
  createSelector(getAuItemsOfCategories({ category: props.category }), (items: AuItem[]) => {
    let Ids: string[] = [];
    Ids = items.map((element) => element.id);
    // eslint-disable-next-line no-console
    console.log(`CategoryId:  ${props.category.id}  -  ItemIdsOfCategory:  ${Ids} `);
    return Ids;
  });

export const getSelectedAuItem = createSelector(selectState, (state: AuItemData) => state.selectedAuItemId);

/*
export const getAuItemsIdsOfCategories = (props: { categoryId: string }) =>
  // 👍 `count` knows that it's a number
  createSelector(selectState, (state: AuItemData) => {
    console.log(`CategoryId:  ${props.categoryId} `);
    // props.page;
    const items = fromAuItems.selectAll(state);
    console.log(`Items:  ${JSON.stringify(items)} `);

    const newItems = items.filter((item) => item.parentId === props.categoryId);
    console.log(`Items of category:  ${JSON.stringify(newItems)} `);

    let Ids: string[] = [];
    Ids = newItems.map((element) => element.id);
    console.log(`ItemsIdsOfCategories:  ${Ids} `);

    return Ids;
  }); */
