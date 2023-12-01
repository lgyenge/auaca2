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
import { AuGlobalResponseSet } from '../models/au-global-response-set.model';
import * as AuGlobalResponseSetActions from '../actions/au-global-response-set.actions';

export const auGlobalResponseSetsFeatureKey = 'auGlobalResponseSets';

export interface AuGlobalResponseSetData extends EntityState<AuGlobalResponseSet> {
  selectedAuGlobalResponseSetId?: string | number;
  loading: boolean;
  error?: string | null;
}

export interface AuGlobalResponseSetStore {
  readonly auCategories: AuGlobalResponseSetData;
}

// export type State = EntityState<AuGlobalResponseSet>;

export const adapter: EntityAdapter<AuGlobalResponseSet> = createEntityAdapter<AuGlobalResponseSet>();

export const initialState: AuGlobalResponseSetData = adapter.getInitialState({
  error: '',
  selectedAuGlobalResponseSetId: null,
  loading: false
});

export const reducer = createReducer(
  initialState,
  on(AuGlobalResponseSetActions.addAuGlobalResponseSet, (state, action) => adapter.addOne(action.auGlobalResponseSet, state)),
  on(AuGlobalResponseSetActions.upsertAuGlobalResponseSet, (state, action) => adapter.upsertOne(action.auGlobalResponseSet, state)),
  on(AuGlobalResponseSetActions.addAuGlobalResponseSets, (state, action) => adapter.addMany(action.auGlobalResponseSets, state)),
  on(AuGlobalResponseSetActions.upsertAuGlobalResponseSets, (state, action) => adapter.upsertMany(action.auGlobalResponseSets, state)),
  on(AuGlobalResponseSetActions.updateAuGlobalResponseSet, (state, action) => adapter.updateOne(action.auGlobalResponseSet, state)),
  on(AuGlobalResponseSetActions.updateAuGlobalResponseSets, (state, action) => adapter.updateMany(action.auGlobalResponseSets, state)),
  on(AuGlobalResponseSetActions.deleteAuGlobalResponseSet, (state, action) => adapter.removeOne(action.id, state)),
  on(AuGlobalResponseSetActions.deleteAuGlobalResponseSets, (state, action) => adapter.removeMany(action.ids, state)),
  on(AuGlobalResponseSetActions.loadAuGlobalResponseSets, (state) => ({ ...state, loaded: false, error: null })),
  on(AuGlobalResponseSetActions.loadAuGlobalResponseSetsSuccess, (state, action) =>
    adapter.setAll(action.AuGlobalResponseSets, { ...state, loaded: true })
  ),
  on(AuGlobalResponseSetActions.loadAuGlobalResponseSetsFailure, (state, { error }) => ({ ...state, error })),
  on(AuGlobalResponseSetActions.clearAuGlobalResponseSets, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
