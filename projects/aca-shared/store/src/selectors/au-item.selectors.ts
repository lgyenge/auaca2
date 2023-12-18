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

export const getAuItemsOfCategories = (props: { category: AuCategory }) =>
  createSelector(selectState, (state: AuItemData) => {
    const items = fromAuItems.selectAll(state);
    return items.filter((item) => item.parentId === props.category.id);
  });
