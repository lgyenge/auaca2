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
import { AuCategory } from '../models/au-category.model';
import * as AuCategoryActions from '../actions/au-category.actions';

export const auCategoriesFeatureKey = 'auCategories';

export interface AuCategoryData extends EntityState<AuCategory> {
  selectedAuCategoryId?: string | number;
  loading: boolean;
  error?: string | null;
}

export interface AuCategoryStore {
  readonly auCategories: AuCategoryData;
}

// export type State = EntityState<AuCategory>;

export const adapter: EntityAdapter<AuCategory> = createEntityAdapter<AuCategory>();

export const initialState: AuCategoryData = adapter.getInitialState({
  error: '',
  selectedCategoryId: null,
  loading: false
});

export const reducer = createReducer(
  initialState,
  on(AuCategoryActions.addAuCategory, (state, action) => adapter.addOne(action.auCategory, state)),
  on(AuCategoryActions.upsertAuCategory, (state, action) => adapter.upsertOne(action.auCategory, state)),
  on(AuCategoryActions.addAuCategories, (state, action) => adapter.addMany(action.auCategories, state)),
  on(AuCategoryActions.upsertAuCategories, (state, action) => adapter.upsertMany(action.auCategories, state)),
  on(AuCategoryActions.updateAuCategory, (state, action) => adapter.updateOne(action.auCategory, state)),
  on(AuCategoryActions.updateAuCategories, (state, action) => adapter.updateMany(action.auCategories, state)),
  on(AuCategoryActions.deleteAuCategory, (state, action) => adapter.removeOne(action.id, state)),
  on(AuCategoryActions.deleteAuCategories, (state, action) => adapter.removeMany(action.ids, state)),
  on(AuCategoryActions.loadAuCategories, (state) => ({ ...state, loaded: false, error: null })),
  on(AuCategoryActions.loadAuCategoriesSuccess, (state, action) => adapter.setAll(action.AuCategories, { ...state, loaded: true })),
  on(AuCategoryActions.loadAuCategoriesFailure, (state, { error }) => ({ ...state, error })),

  // on(AuCategoryActions.loadAuCategories, (state, action) => adapter.setAll(action.auCategories, state)),
  on(AuCategoryActions.clearAuCategories, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
