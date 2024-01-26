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
import { orderStateItemsFn, setPageItemsFn, setSectionItemsFn, findPrevNodeFn } from '../au-helpers/au-store-helpers';
// import { orderStateItemsFn, setPageItemsFn } from '../au-helpers/au-store-helpers';
import { AuSelectionState } from '../public-api';

export const auTemplsFeatureKey = 'auTempls';

export interface State extends EntityState<Node> {
  // additional entities state properties
  loaded: boolean;
  template: Node;
  firstPage: Node;
  closed: Node[];
  // selectedAuItem: Node;
  selection: AuSelectionState;
  error: string | null;
}

export interface AuTemplsStore {
  readonly auTempls: State;
}

export const adapter: EntityAdapter<Node> = createEntityAdapter<null>({
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  template: null,
  loaded: false,
  firstPage: null,
  closed: [],
  // selectedAuItem: null,
  selection: {
    isEmpty: true,
    item: null,
    page: null,
    isFirstPage: false,
    section: null,
    prevItem: null,
    nextItem: null,
    firstItem: null,
    lastItem: null,
    itemsInGroup: []
  },
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
  //  on(AuTemplActions.deleteAuTempl, (state) => ({ ...state })),
  // on(AuTemplActions.deleteAuTemplSuccess, (state: AuTemplsData, { pageId }) =>
  //  auTemplatesAdapter.removeOne(pageId, { ...state, loaded: true, error: null })
  // ),
  // on(AuTemplActions.deleteAuTemplFailure, (state, { error }) => ({ ...state, error })),
  // on(AuTemplActions.deleteAuTempls, (state, action) => adapter.removeMany(action.ids, state)),
  // on(AuTemplActions.loadAuTempl, (state, action) => adapter.setAll(action.auTempls, state)),

  on(AuTemplActions.loadAuItems, (state) => ({ ...state, loaded: false, error: null })),

  on(AuTemplActions.loadAuItemsSuccess, (state, { items }) => {
    const result = setFirstPageState(items);
    state = adapter.setAll(result.items, { ...state, firstPage: result.firstPage, loaded: true });
    const sortedItems = orderStateItemsFn(state);
    // eslint-disable-next-line no-console
    // console.log(`sortedItems:  ${JSON.stringify(sortedItems)}`);
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
  /* on(AuTemplActions.selectAuItem, (state, action) => ({ ...state, selectedAuItem: action.item })), */
  on(AuTemplActions.selectAuItem, (state, action) => {
    const newState = updateSelectedAuNodes(state, action.item);
    // eslint-disable-next-line no-console
    console.log(`nextItem: ${newState.selection?.nextItem?.id}`);
    return newState;
  }),

  // on(AuTemplActions.unSelectAuItem, (state) => ({ ...state, selectedAuItem: null })),
  on(AuTemplActions.unSelectAuItem, (state) => ({
    ...state,
    selection: {
      isEmpty: true,
      item: null,
      page: null,
      isFirstPage: false,
      section: null,
      prevItem: null,
      nextItem: null,
      firstItem: null,
      lastItem: null,
      itemsInGroup: []
    }
  })),
  // on(AuTemplActions.addAuItem, (state) => ({ ...state })),
  on(AuTemplActions.addAuItemSuccess, (state, { params: { modifiedItem, newItem } }) => {
    const nodes: Node[] = [];
    nodes.push(modifiedItem);
    nodes.push(newItem);
    const sortedItems: Node[] = [];
    state = adapter.upsertMany(nodes, state);
    const entities = selectEntities(state);
    // let currentItem = state.firstPage;
    let currentItem = entities[state.firstPage.id];
    do {
      sortedItems.push(currentItem);
      currentItem = entities[currentItem.properties['au:nextItemId']];
    } while (!(currentItem.properties['au:nextItemId'] == null));
    sortedItems.push(currentItem);
    // return state;
    return adapter.setAll(sortedItems, { ...state, loaded: true });
  }),
  // on(AuTemplActions.addAuItemFailure, (state, { error }) => ({ ...state, error })),
  on(AuTemplActions.deleteAuItemGroup, (state) => ({ ...state })),
  on(AuTemplActions.deleteAuItemGroupSuccess, (state, { params: { prevItem, itemsInGroup } }) => {
    const sortedItems: Node[] = [];
    const itemIds = itemsInGroup.map((item) => item.id);
    state = adapter.removeMany(itemIds, state);
    state = adapter.upsertOne(prevItem, state);
    const entities = selectEntities(state);
    // let currentItem = state.firstPage;
    let currentItem = entities[state.firstPage.id];
    sortedItems.push(currentItem);
    while (!(currentItem.properties['au:nextItemId'] == null)) {
      currentItem = entities[currentItem.properties['au:nextItemId']];
      sortedItems.push(currentItem);

      // exit if property = null or undefined or not exist
      // eslint-disable-next-line no-console
      console.log(` property: ${currentItem?.properties['au:nextItemId']} result: ${!(currentItem?.properties['au:nextItemId'] == null)}`);
    }

    // return state;
    return adapter.setAll(sortedItems, { ...state, loaded: true });
  }),
  on(AuTemplActions.deleteAuItemGroupFailure, (state, { error }) => ({ ...state, error })),
  on(AuTemplActions.closePage, (state, { params: item }) => {
    item.properties['au:pageClosed'] = true;
    const selectedPage = setPageItemsFn(item, state);
    return adapter.upsertMany(selectedPage.itemsInGroup, state);
  }),
  on(AuTemplActions.closeSection, (state, { params: item }) => {
    item.properties['au:sectionClosed'] = true;
    const selectedSection = setSectionItemsFn(item, state);
    return adapter.upsertMany(selectedSection.itemsInGroup, state);
  }),
  on(AuTemplActions.openPage, (state, { params: item }) => {
    item.properties['au:pageClosed'] = false;
    const selectedPage = setPageItemsFn(item, state);
    return adapter.upsertMany(selectedPage.itemsInGroup, state);
  }),
  on(AuTemplActions.openSection, (state, { params: item }) => {
    item.properties['au:sectionClosed'] = false;
    const selectedSection = setSectionItemsFn(item, state);
    return adapter.upsertMany(selectedSection.itemsInGroup, state);
  })
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

function updateSelectedAuNodes(state: State, selectedItem: Node): State {
  const newState = { ...state };
  let isEmpty = true;
  let item = null;
  let page = null;
  let isFirstPage = false;
  let section = null;
  let prevItem = null;
  let nextItem = null;
  let firstItem = null;
  let lastItem = null;
  let itemsInGroup = [];

  if (selectedItem.nodeType === 'au:itemQuestion') {
    isEmpty = false;
    item = selectedItem;
    firstItem = item;
    lastItem = item;
    nextItem = state.entities[item?.properties['au:nextItemId']];
    itemsInGroup.push(item);
  } else if (selectedItem.nodeType === 'au:page' || selectedItem.nodeType === 'au:firstPage') {
    isEmpty = false;
    item = selectedItem;
    isFirstPage = item.nodeType === 'au:firstPage' ? true : false;
    const selectedPage = setPageItemsFn(item, state);
    page = item;
    firstItem = selectedPage.firstItem;
    lastItem = selectedPage.lastItem;
    nextItem = selectedPage.nextItem;
    itemsInGroup = selectedPage.itemsInGroup;
  } else if (selectedItem.nodeType === 'au:itemSection') {
    isEmpty = false;
    item = selectedItem;
    const selectedSection = setSectionItemsFn(item, state);
    section = item;
    firstItem = selectedSection.firstItem;
    lastItem = selectedSection.lastItem;
    nextItem = selectedSection.nextItem;
    itemsInGroup = selectedSection.itemsInGroup;
    firstItem = item;
  }

  prevItem = findPrevNodeFn(item, state);

  newState.selection = {
    isEmpty,
    item,
    page,
    isFirstPage,
    section,
    prevItem,
    nextItem,
    firstItem,
    lastItem,
    itemsInGroup
  };
  return newState;
}

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
