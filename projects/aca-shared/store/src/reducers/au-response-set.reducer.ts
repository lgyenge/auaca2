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

import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AuResponseSet } from '../models/au-response-set.model';
import * as AuResponseSetActions from '../actions/au-response-set.actions';

export const auResponseSetsFeatureKey = 'auResponseSets';

export interface AuResponseSetData extends EntityState<AuResponseSet> {
  selectedAuResponseSetId?: string | number;
  loading: boolean;
  error?: string | null;
}

export interface AuResponseSetStore {
  readonly auCategories: AuResponseSetData;
}

// export type State = EntityState<AuResponseSet>;

export const adapter: EntityAdapter<AuResponseSet> = createEntityAdapter<AuResponseSet>();

export const initialState: AuResponseSetData = adapter.getInitialState({
  error: '',
  selectedAuResponseSetId: null,
  loading: false
});

export const reducer = createReducer(
  initialState,
  on(AuResponseSetActions.addAuResponseSet, (state, action) => adapter.addOne(action.auResponseSet, state)),
  on(AuResponseSetActions.upsertAuResponseSet, (state, action) => adapter.upsertOne(action.auResponseSet, state)),
  on(AuResponseSetActions.addAuResponseSets, (state, action) => adapter.addMany(action.auResponseSets, state)),
  on(AuResponseSetActions.upsertAuResponseSets, (state, action) => adapter.upsertMany(action.auResponseSets, state)),
  on(AuResponseSetActions.updateAuResponseSet, (state, action) => adapter.updateOne(action.auResponseSet, state)),
  on(AuResponseSetActions.updateAuResponseSets, (state, action) => adapter.updateMany(action.auResponseSets, state)),
  on(AuResponseSetActions.deleteAuResponseSet, (state, action) => adapter.removeOne(action.id, state)),
  on(AuResponseSetActions.deleteAuResponseSets, (state, action) => adapter.removeMany(action.ids, state)),
  on(AuResponseSetActions.loadAuResponseSets, (state) => ({ ...state, loaded: false, error: null })),
  on(AuResponseSetActions.loadAuResponseSetsSuccess, (state, action) => adapter.setAll(action.AuResponseSets, { ...state, loaded: true })),
  on(AuResponseSetActions.loadAuResponseSetsFailure, (state, { error }) => ({ ...state, error })),
  on(AuResponseSetActions.clearAuResponseSets, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
