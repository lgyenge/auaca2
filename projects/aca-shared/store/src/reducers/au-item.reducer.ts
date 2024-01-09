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
import { NodeEntry, NodePaging } from '@alfresco/js-api';
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
  selectedAuItemId: null,
  loaded: false
});

export const reducer = createReducer(
  initialState,
  // on(AuItemActions.addAuItem, (state, action) => adapter.addOne(action.auItem, state)),
  on(AuItemActions.addAuItem, (state) => ({ ...state })),
  on(AuItemActions.addAuItemSuccess, (state: AuItemData, { item, itemNumber }) => {
    const nodes = selectAll(state);
    nodes.splice(itemNumber, 0, item);
    return adapter.setAll(nodes, { ...state, loaded: true, error: null });
  }),
  on(AuItemActions.addAuItemFailure, (state, { error }) => ({ ...state, error })),
  on(AuItemActions.deleteAuItem, (state) => ({ ...state })),
  on(AuItemActions.deleteAuItemSuccess, (state: AuItemData, { itemId }) => adapter.removeOne(itemId, { ...state, loaded: true, error: null })),
  on(AuItemActions.deleteAuItemFailure, (state, { error }) => ({ ...state, error })),
  on(AuItemActions.moveAuItem, (state, { params: { node, oldIndex, newIndex } }) => {
    const entities = selectAll(state);
    // eslint-disable-next-line no-console
    // console.log(`nodeId:  ${node.id} `);
    let foundIndex = 0;
    entities.find(startFn);
    function startFn(element, index) {
      if (element.id === node.id) {
        foundIndex = index;
      }
    }
    // eslint-disable-next-line no-console
    // console.log(`előtte oldIndex:  ${oldIndex} - newIndex: ${newIndex} - foundIndex: ${foundIndex}`);
    const oldIndex2 = foundIndex;
    const newIndex2 = foundIndex + (newIndex - oldIndex);
    // eslint-disable-next-line no-console
    // console.log(`utána oldIndex2:  ${oldIndex2} - newIndex2: ${newIndex2} - foundIndex: ${foundIndex}`);
    // console.log(`entities:  ${JSON.stringify(entities)}`);
    moveItemInArray<AuItem>(entities, oldIndex2, newIndex2);
    // console.log(`entities:  ${JSON.stringify(entities)}`);
    return adapter.setAll(entities, { ...state, loaded: true });
  }),
  on(AuItemActions.upsertAuItem, (state, action) => adapter.upsertOne(action.auItem, state)),
  on(AuItemActions.addAuItems, (state, action) => adapter.addMany(action.auItems, state)),
  on(AuItemActions.upsertAuItems, (state, action) => adapter.upsertMany(action.auItems, state)),
  on(AuItemActions.updateAuItem, (state, action) => adapter.updateOne(action.auItem, state)),
  on(AuItemActions.updateAuItems, (state, action) => adapter.updateMany(action.auItems, state)),
  // on(AuItemActions.deleteAuItem, (state) => ({ ...state, loaded: false, error: null })),

  on(AuItemActions.deleteAuItems, (state, action) => adapter.removeMany(action.ids, state)),
  on(AuItemActions.loadAuItems, (state) => ({ ...state, loaded: false, error: null })),

  /* on(AuItemActions.loadAuItemsSuccess, (state, action) => {
    const nodes: AuItem[] = [];
    // eslint-disable-next-line no-console
    console.log(`item reducer arr: ${JSON.stringify(action.itemArray)}`);
    const n = action.itemArray as NodePaging[];
    n.forEach((element, index) => {
      if (index % 2 === 0) {
        element.list.entries.forEach((el) => {
          nodes.push(el.entry);
        });
      } else {
        // const _ord = element as Node;
      }
    });
    return adapter.upsertMany(nodes, { ...state, loaded: true });
  }), */
  on(AuItemActions.loadAuItemsSuccess, (state, action) => {
    const sortedNodes: AuItem[] = [];
    // eslint-disable-next-line no-console
    // console.log(`item reducer arr: ${JSON.stringify(action.itemArray)}`);
    for (let i = 0; i < action.itemArray.length; i = i + 2) {
      // eslint-disable-next-line no-console
      // console.log(`action.itemArray[${i}]:  ${JSON.stringify(action.itemArray[i])}`);
      // eslint-disable-next-line no-console
      // console.log(`action.itemArray[${i + 1}]:  ${JSON.stringify(action.itemArray[i + 1])}`);
      const iDs: string[] = (action.itemArray[i + 1] as AuItem).properties['au:pagesOrder']?.split(',');
      iDs?.forEach((e) => {
        (action.itemArray[i] as NodePaging).list.entries.find(checkId);
        function checkId(entry: NodeEntry) {
          if (e === entry.entry.id) {
            sortedNodes.push(entry.entry);
          }
        }
      });
      // eslint-disable-next-line no-console
      // console.log(`sorted nodes:  ${JSON.stringify(sortedNodes)}`);
    }
    return adapter.setAll(sortedNodes, { ...state, loaded: true });
    // return adapter.setAll(nodes, { ...state, loaded: true });
  }),

  on(AuItemActions.loadAuItemsFailure, (state, { error }) => ({ ...state, error })),
  on(AuItemActions.clearAuItems, (state) => adapter.removeAll({ ...state, loaded: false, error: null })),
  on(AuItemActions.selectAuItem, (state, action) => ({ ...state, selectedAuItemId: action.id })),
  on(AuItemActions.unSelectAuItem, (state) => ({ ...state, selectedAuItemId: null })),
  on(AuItemActions.toggleAuItemSelection, (state, action) => {
    if (state.selectedAuItemId) {
      return { ...state, selectedAuItemId: null };
    } else {
      return { ...state, selectedAuItemId: action.id };
    }
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
