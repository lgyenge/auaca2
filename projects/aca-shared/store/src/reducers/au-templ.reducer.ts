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

/* eslint-disable @cspell/spellchecker */

import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as AuTemplActions from '../actions/au-templ.actions';
import { Node, NodeEntry } from '@alfresco/js-api';
import { orderStateItemsFn } from '../au-helpers/au-store-helpers';

export const auTemplsFeatureKey = 'auTempls';

export interface State extends EntityState<Node> {
  // additional entities state properties
  loaded: boolean;
  template: Node;
  firstPage: Node;
  closed: Node[];
  selectedAuItem: Node;
  error: string | null;
}

export interface AuTemplsStore {
  readonly auTempls: State;
}

export const adapter: EntityAdapter<Node> = createEntityAdapter<Node>({
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  template: null,
  loaded: false,
  firstPage: null,
  closed: [],
  selectedAuItem: null,
  error: null
});

export const reducer = createReducer(
  initialState,
  // on(AuTemplActions.addAuTempl, (state, action) => adapter.addOne(action.auTempl, state)),
  // on(AuTemplActions.upsertAuTempl, (state, action) => adapter.upsertOne(action.auTempl, state)),
  // on(AuTemplActions.addAuTempls, (state, action) => adapter.addMany(action.auTempls, state)),
  on(AuTemplActions.addAuTempl, (state) => ({ ...state })),
  on(AuTemplActions.addAuTemplSuccess, (state: State, { params: { template, nodes } }) => {
    return adapter.setAll(nodes, { ...state, loaded: true, template: template, firstPage: nodes[0] });
  }),
  on(AuTemplActions.addAuTemplFailure, (state, { error }) => ({ ...state, error })),

  // on(AuTemplActions.upsertAuTempls, (state, action) => adapter.upsertMany(action.auTempls, state)),
  // on(AuTemplActions.updateAuTempl, (state, action) => adapter.updateOne(action.auTempl, state)),
  // on(AuTemplActions.updateAuTempls, (state, action) => adapter.updateMany(action.auTempls, state)),
  // on(AuTemplActions.deleteAuTempl, (state, action) => adapter.removeOne(action.id, state)),
  /* on(AuTemplActions.deleteAuTempl, (state) => ({ ...state })),
  on(AuTemplActions.deleteAuTemplSuccess, (state: AuTemplsData, { pageId }) =>
    auTemplatesAdapter.removeOne(pageId, { ...state, loaded: true, error: null })
  ),
  on(AuTemplActions.deleteAuTemplFailure, (state, { error }) => ({ ...state, error })), */

  on(AuTemplActions.deleteAuTempls, (state, action) => adapter.removeMany(action.ids, state)),
  // on(AuTemplActions.loadAuTempl, (state, action) => adapter.setAll(action.auTempls, state)),
  on(AuTemplActions.loadAuItems, (state) => ({ ...state, loaded: false, error: null })),

  on(AuTemplActions.loadAuItemsSuccess, (state, { items }) => {
    /* const sortedItems: Node[] = [];
    const firstPage = items.find((node) => node.entry.nodeType === 'au:firstPage');
    let prevItem = firstPage;

    sortedItems.push(firstPage.entry);
    items.forEach((e) => {
      // eslint-disable-next-line no-console
      console.log(`e:  ${e.entry.id}`);
      items.find(checkId);
      function checkId(value: NodeEntry) {
        if (prevItem.entry.properties['au:nextItemId'] === value.entry.id) {
          sortedItems.push(value.entry);
          prevItem = value;
          // eslint-disable-next-line no-console
          console.log(`pushedItem:  ${prevItem.entry.id}`);
        }
      }
      // eslint-disable-next-line no-console
      console.log(`prevItem2:  ${prevItem.entry.id}`);
    }); */
    const result = setFirstPageState(items);
    state = adapter.setAll(result.items, { ...state, firstPage: result.firstPage, loaded: true });
    const sortedItems = orderStateItemsFn(state);
    // eslint-disable-next-line no-console
    console.log(`sortedItems:  ${JSON.stringify(sortedItems)}`);
    return adapter.setAll(sortedItems, { ...state, loaded: true });
  }),
  on(AuTemplActions.loadAuItemsFailure, (state, { error }) => ({ ...state, error })),

  on(AuTemplActions.loadAuTempl, (state) => state),
  on(AuTemplActions.loadAuTemplSuccess, (state, action) => ({
    ...state,
    template: action.data,
    loaded: true
  })),
  on(AuTemplActions.loadAuTemplFailure, (state, action) => ({
    ...state,
    error: action.error,
    template: null,
    loaded: false
  })),
  on(AuTemplActions.selectAuItem, (state, action) => ({ ...state, selectedAuItem: action.item })),
  on(AuTemplActions.unSelectAuItem, (state) => ({ ...state, selectedAuItem: null })),
  on(AuTemplActions.toggleAuItemSelection, (state, action) => {
    if (state.selectedAuItem) {
      return { ...state, selectedAuItem: null };
    } else {
      return { ...state, selectedAuItem: action.item };
    }
  }),
  // on(AuTemplActions.addAuItem, (state) => ({ ...state })),
  /* on(AuTemplActions.addAuItemSuccess, (state, { params: { prevItem, newItem } }) => {
    const sortedItems: Node[] = [];
    const entities = selectEntities(state);
    state = adapter.addOne(newItem, state)
    // entities[newItem.id] = newItem;
    entities[prevItem.id] = prevItem;
    let currentItem = state.firstPage;
    do {
      sortedItems.push(currentItem);
      currentItem = entities[currentItem.properties['au:nextItemId']];
    } while (!(currentItem.properties['au:nextItemId'] == null));
    sortedItems.push(currentItem);
    return adapter.setAll(sortedItems, { ...state, loaded: true });
  }) */
  on(AuTemplActions.addAuItemSuccess, (state, { params: { prevItem, newItem } }) => {
    const nodes: Node[] = [];
    nodes.push(prevItem);
    nodes.push(newItem);
    const sortedItems: Node[] = [];
    state = adapter.upsertMany(nodes, state);
    const entities = selectEntities(state);
    let currentItem = state.firstPage;
    do {
      sortedItems.push(currentItem);
      currentItem = entities[currentItem.properties['au:nextItemId']];
    } while (!(currentItem.properties['au:nextItemId'] == null));
    sortedItems.push(currentItem);
    // return state;
    return adapter.setAll(sortedItems, { ...state, loaded: true });
  })
  // on(AuTemplActions.addAuItemFailure, (state, { error }) => ({ ...state, error })),
  // on(AuTemplActions.deleteAuItem, (state) => ({ ...state })),
  // on(AuTemplActions.deleteAuItemSuccess, (state: AuItemData, { itemId }) => adapter.removeOne(itemId, { ...state, loaded: true, error: null })),
  // on(AuTemplActions.deleteAuItemFailure, (state, { error }) => ({ ...state, error })),

  // on(AuTemplActions.clearAuTempls, (state) => adapter.removeAll(state))
);

/** map nodeEnties to nodes and find first page */
function setFirstPageState(itemEntries: NodeEntry[]): { items: Node[]; firstPage: Node } {
  // const firstPage = itemEntries.find((node) => node.entry.nodeType === 'au:firstPage');
  let firstPage: Node = null;
  const items = itemEntries.map((value) => {
    if (value.entry.nodeType === 'au:firstPage') {
      firstPage = value.entry;
    }
    return value.entry;
  });
  return { items: items, firstPage: firstPage };
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
