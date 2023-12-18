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
import * as AuItemActions from '../actions/au-item.actions';
import { AuItem } from '../models/au-item.model';
import { Node } from '@alfresco/js-api';
import { moveItemInArray } from '@angular/cdk/drag-drop';

export const auItemsFeatureKey = 'auItems';

export interface AuItemData extends EntityState<AuItem> {
  selectedAuItemId?: string | number;
  loaded: boolean;
  error?: string | null;
}

export interface AuItemStore {
  readonly auItem: AuItemData;
}

// export type State = EntityState<AuItem>;

export const adapter: EntityAdapter<AuItem> = createEntityAdapter<AuItem>({
  sortComparer: false
});

export const initialState: AuItemData = adapter.getInitialState({
  error: '',
  selectedItemId: null,
  loaded: false
});

export const reducer = createReducer(
  initialState,
  // on(AuItemActions.addAuItem, (state, action) => adapter.addOne(action.auItem, state)),
  on(AuItemActions.addAuItem, (state) => ({ ...state, loaded: false, error: null })),
  on(AuItemActions.addAuItemSuccess, (state: AuItemData, { item, itemNumber }) => {
    const nodes = selectAll(state);
    nodes.splice(itemNumber, 0, item);
    return adapter.setAll(nodes, { ...state });
  }),
  on(AuItemActions.addAuItemFailure, (state, { error }) => ({ ...state, error })),
  on(AuItemActions.deleteAuItem, (state) => ({ ...state, loaded: false, error: null })),
  on(AuItemActions.deleteAuItemSuccess, (state: AuItemData, { itemId }) => adapter.removeOne(itemId, state)),
  on(AuItemActions.deleteAuItemFailure, (state, { error }) => ({ ...state, error })),
  on(AuItemActions.moveAuItem, (state, { params: { oldIndex, newIndex } }) => {
    const entities = selectAll(state);
    moveItemInArray<AuItem>(entities, oldIndex, newIndex);
    return adapter.setAll(entities, { ...state, loaded: true });
  }),
  on(AuItemActions.upsertAuItem, (state, action) => adapter.upsertOne(action.auItem, state)),
  on(AuItemActions.addAuItems, (state, action) => adapter.addMany(action.auItems, state)),
  on(AuItemActions.upsertAuItems, (state, action) => adapter.upsertMany(action.auItems, state)),
  on(AuItemActions.updateAuItem, (state, action) => adapter.updateOne(action.auItem, state)),
  on(AuItemActions.updateAuItems, (state, action) => adapter.updateMany(action.auItems, state)),
  // on(AuItemActions.deleteAuItem, (state, action) => adapter.removeOne(action.id, state)),
  on(AuItemActions.deleteAuItem, (state) => ({ ...state, loaded: false, error: null })),

  on(AuItemActions.deleteAuItems, (state, action) => adapter.removeMany(action.ids, state)),
  on(AuItemActions.loadAuItems, (state) => ({ ...state, loaded: false, error: null })),
  // on(AuItemActions.loadAuItemsSuccess, (state, action) => adapter.setAll(action.AuItems, { ...state, loaded: true })),
  on(AuItemActions.loadAuItemsSuccess, (state, action) => {
    const nodes: Node[] = [];
    action.nodePaging.list.entries.forEach((element) => {
      return nodes.push(element.entry);
    });
    return adapter.upsertMany(nodes, { ...state, loaded: true });
  }),

  on(AuItemActions.loadAuItemsFailure, (state, { error }) => ({ ...state, error })),
  on(AuItemActions.clearAuItems, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
