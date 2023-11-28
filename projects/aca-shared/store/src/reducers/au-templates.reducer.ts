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

/* eslint-disable @typescript-eslint/no-unused-vars */


import { createReducer, on, Action } from '@ngrx/store';
// import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// import { AuPage, auPagesFeatureKey, State, adapter, initialState } from '@alfresco/aca-shared/store';
import { adapter, initialState, State } from '@alfresco/aca-shared/store';
import * as AuPageActions from '@alfresco/aca-shared/store';

// export const auPagesFeatureKey = 'auPages';

// export type State = EntityState<AuPage>;

// export const adapter: EntityAdapter<AuPage> = createEntityAdapter<AuPage>();

// export const initialState: State = adapter.getInitialState({
// additional entity state properties
// });

export const auTemplatesReducer = createReducer(
  initialState,
  on(AuPageActions.addAuPage, (state, action) => adapter.addOne(action.auPage, state)),
  on(AuPageActions.upsertAuPage, (state, action) => adapter.upsertOne(action.auPage, state)),
  on(AuPageActions.addAuPages, (state, action) => adapter.addMany(action.auPages, state)),
  on(AuPageActions.upsertAuPages, (state, action) => adapter.upsertMany(action.auPages, state)),
  on(AuPageActions.updateAuPage, (state, action) => adapter.updateOne(action.auPage, state)),
  on(AuPageActions.updateAuPages, (state, action) => adapter.updateMany(action.auPages, state)),
  on(AuPageActions.deleteAuPage, (state, action) => adapter.removeOne(action.id, state)),
  on(AuPageActions.deleteAuPages, (state, action) => adapter.removeMany(action.ids, state)),
  // on(AuPageActions.loadAuPages, (state, action) => adapter.setAll(action.auPages, state)),
  on(AuPageActions.loadAuPages, (state) => ({ ...state, loaded: false, error: null })),
  on(AuPageActions.loadAuPagesSuccess, (state, action) => adapter.setAll(action.AuPages, { ...state, loaded: true })),
  on(AuPageActions.loadAuPagesFailure, (state, { error }) => ({ ...state, error })),

  on(AuPageActions.clearAuPages, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export function auReducer(state: State | undefined, action: Action) {
  return auTemplatesReducer(state, action);
}
