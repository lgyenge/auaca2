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
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AuPage } from '../models/au-templates.model';
// import * as AuPageActions from '../actions/au-templates-actions';

export const auPagesFeatureKey = 'auPages';
export type State = EntityState<AuPage>;
export const adapter: EntityAdapter<AuPage> = createEntityAdapter<AuPage>();
export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

// Lookup the 'Pages' feature state managed by NgRx
export const selectState = createFeatureSelector<State>(auPagesFeatureKey);

const { selectAll, selectEntities } = adapter.getSelectors();

// export const selectPagesLoaded = createSelector(selectState, (state: State) => state.loaded);

// export const selectPagesError = createSelector(selectState, (state: State) => state.error);

export const selectAllPages = createSelector(selectState, (state: State) => selectAll(state));

export const selectPagesEntities = createSelector(selectState, (state: State) => selectEntities(state));

// export const selectSelectedId = createSelector(selectState, (state: State) => state.selectedId);

/* export const selectEntity = createSelector(selectPagesEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
); */
