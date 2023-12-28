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
const selectState = createFeatureSelector<AuPagesData>(fromAuPages.auPagesFeatureKey);

// export const selectPagesLoaded = createSelector(selectState, (state: State) => state.loaded);

// export const selectPagesError = createSelector(selectState, (state: State) => state.error);
// select Ids, selectEntities, selectAll, selectTotal
export const getAuPagesAll = createSelector(selectState, (state: AuPagesData) => fromAuPages.selectAll(state));
export const getAuPagesIds = createSelector(selectState, (state: AuPagesData) => fromAuPages.selectIds(state));

export const getAuPagesEntities = createSelector(selectState, (state: AuPagesData) => fromAuPages.selectEntities(state));

// export const getSelectedId = createSelector(selectState, (state: State) => state.selectedId);

/* export const getEntity = createSelector(selectPagesEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
); */

export const auPageQuery = {
  getAuPagesAll,
  getAuPagesEntities
  // getSelectedProductId,
  // getSelectedProduct,
};

export const getAuPagesLoaded = createSelector(selectState, (state: AuPagesData) => state.loaded);
const selectPagesLoaded = createSelector(selectState, (state) => state.loaded);

export const selectPagesReady = createSelector(selectPagesLoaded, getAuPagesAll, (ready, pages) => ({ ready, pages }));
export const getAuPagesOfPages = (props: { templateId: string }) =>
  // 👍 `count` knows that it's a number
  createSelector(selectState, (state: AuPagesData) => {
    // props.page;
    const pages = fromAuPages.selectAll(state);
    const newPages = pages.filter((page) => page.parentId === props.templateId);
    if (state.loaded) {
      return newPages;
    } else {
      return null;
    }
  });
