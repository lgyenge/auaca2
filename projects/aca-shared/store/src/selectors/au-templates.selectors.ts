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
import { AuPagesData } from '../reducers/au-pages.reducer';
import * as fromAuPages from '../reducers/au-pages.reducer';

// Lookup the 'Pages' feature state managed by NgRx
export const selectState = createFeatureSelector<AuPagesData>(fromAuPages.auPagesFeatureKey);

// export const selectPagesLoaded = createSelector(selectState, (state: State) => state.loaded);

// export const selectPagesError = createSelector(selectState, (state: State) => state.error);

export const getAllAuPages = createSelector(selectState, (state: AuPagesData) => fromAuPages.selectAll(state));

export const getAuPagesEntities = createSelector(selectState, (state: AuPagesData) => fromAuPages.selectEntities(state));

// export const getSelectedId = createSelector(selectState, (state: State) => state.selectedId);

/* export const getEntity = createSelector(selectPagesEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
); */

export const auPageQuery = {
  getAllAuPages,
  getAuPagesEntities
  // getSelectedProductId,
  // getSelectedProduct,
};
