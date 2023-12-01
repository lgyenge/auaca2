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

import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as AuPagesActions from '../actions/au-templates-actions';
import { AuPage } from '../models/au-templates.model';
export const auPagesFeatureKey = 'auPages';

export interface AuPagesData extends EntityState<AuPage> {
  selectedAuPageId?: string | number;
  loading: boolean;
  error?: string | null;
}

export interface AuPagesStore {
  readonly auPages: AuPagesData;
}

export const auPagesAdapter: EntityAdapter<AuPage> = createEntityAdapter<AuPage>({});
export const initialState: AuPagesData = auPagesAdapter.getInitialState({
  error: '',
  selectedProductId: null,
  loading: false
});

export const auPagesReducer = createReducer(
  initialState,
  on(AuPagesActions.addAuPage, (state, action) => auPagesAdapter.addOne(action.auPage, state)),
  on(AuPagesActions.upsertAuPage, (state, action) => auPagesAdapter.upsertOne(action.auPage, state)),
  on(AuPagesActions.addAuPages, (state, action) => auPagesAdapter.addMany(action.auPages, state)),
  on(AuPagesActions.upsertAuPages, (state, action) => auPagesAdapter.upsertMany(action.auPages, state)),
  on(AuPagesActions.updateAuPage, (state, action) => auPagesAdapter.updateOne(action.auPage, state)),
  on(AuPagesActions.updateAuPages, (state, action) => auPagesAdapter.updateMany(action.auPages, state)),
  on(AuPagesActions.deleteAuPage, (state, action) => auPagesAdapter.removeOne(action.id, state)),
  on(AuPagesActions.deleteAuPages, (state, action) => auPagesAdapter.removeMany(action.ids, state)),
  on(AuPagesActions.loadTemplatePages, (state) => ({ ...state, loaded: false, error: null })),
  on(AuPagesActions.loadTemplatePagesSuccess, (state, action) => auPagesAdapter.setAll(action.AuPages, { ...state, loaded: true })),
  on(AuPagesActions.loadTemplatePagesFailure, (state, { error }) => ({ ...state, error })),

  on(AuPagesActions.clearAuPages, (state) => auPagesAdapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = auPagesAdapter.getSelectors();

/* export function auReducer(state: AuPagesData | undefined, action: Action) {
  return auPagesReducer(state, action);
} */
