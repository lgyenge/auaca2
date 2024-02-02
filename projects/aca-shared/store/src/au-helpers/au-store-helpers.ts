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

import { State } from '../reducers/au-templ.reducer';
import { Node, NodeEntry } from '@alfresco/js-api';
// import { AuEntitiesParams, AuSelectionState } from '../models/au-templ.model';
import { AuSelectionState } from '../models/au-templ.model';

export function findPrevNodeFn(node: Node, state: State): Node {
  let prev: Node = null;
  if (node && node !== state.firstPage) {
    // prev = state.firstPage;
    prev = state.entities[state.firstPage.id];

    // eslint-disable-next-line no-console
    // console.log(`prev: ${prev?.id} prev-nextItemId ${prev?.properties['au:nextItemId']} node: ${node?.id} node.nodeType: ${node?.nodeType} `);
    while (prev?.properties['au:nextItemId'] && prev?.properties['au:nextItemId'] !== node.id) {
      prev = state.entities[prev.properties['au:nextItemId']];
      // eslint-disable-next-line no-console
      // console.log(`prev: ${prev?.id} prev-nextItemId ${prev?.properties['au:nextItemId']} node: ${node?.id} node.nodeType: ${node?.nodeType} `);
    }
  }
  // eslint-disable-next-line no-console
  // console.log(`prev: ${prev?.id} prev-nextItemId ${prev?.properties['au:nextItemId']} node: ${node?.id} node.nodeType: ${node?.nodeType} `);

  return prev;
}

export function setAllPagesItemsFn(pages: Node[], state: State): Node[] {
  let items = [];
  pages.forEach((element) => {
    const entObj = setPageItemsFn(element, state);
    items = [...items, ...entObj.itemsInGroup];
  });
  return items;
}

/** select page items for add, delete, move page */
export function setPageItemsFn(page: Node, state: State): AuSelectionState {
  const auEntities: AuSelectionState = {
    isEmpty: false,
    // prevItem: null,
    firstItem: page,
    lastItem: null,
    nextItem: null,
    itemsInGroup: []
  };
  let current = page;
  let next = state.entities[current.properties['au:nextItemId']];
  // eslint-disable-next-line no-console
  // console.log(`current: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} next: ${next?.id} next.nodeType: ${next?.nodeType} `);
  while (current.properties['au:nextItemId'] && next?.nodeType !== 'au:page') {
    // eslint-disable-next-line no-console
    /* console.log(
      `current: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} next: ${next?.id} next.nodeType: ${next?.nodeType} `
    ); */

    current.properties['au:pageId'] = page.id;
    current.properties['au:pageClosed'] = page.properties['au:pageClosed'];
    auEntities.itemsInGroup.push(current);
    current = next;
    next = state.entities[current.properties['au:nextItemId']];
    // eslint-disable-next-line no-console
    /*  console.log(
      `current: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} next: ${next?.id} next.nodeType: ${next?.nodeType} `
    ); */
  }
  current.properties['au:pageId'] = page.id;
  current.properties['au:pageClosed'] = page.properties['au:pageClosed'];
  auEntities.itemsInGroup.push(current);
  auEntities.lastItem = current;
  auEntities.nextItem = next;
  if (auEntities.nextItem === undefined) {
    auEntities.nextItem = null;
  }

  return auEntities;
}

/** select section items for add, delete, move section */
export function setSectionItemsFn(section: Node, state: State): AuSelectionState {
  const auEntities: AuSelectionState = {
    isEmpty: false,
    // prevItem: null,
    firstItem: section,
    lastItem: null,
    nextItem: null,
    itemsInGroup: []
  };
  let current = section;
  let next = state.entities[current.properties['au:nextItemId']];
  while (
    current.properties['au:nextItemId'] &&
    current.properties['au:sectionId'] &&
    current.properties['au:sectionId'] === next.properties['au:sectionId']
  ) {
    current.properties['au:sectionClosed'] = section.properties['au:sectionClosed'];
    auEntities.itemsInGroup.push(current);
    current = next;
    next = state.entities[current.properties['au:nextItemId']];
  }
  current.properties['au:sectionClosed'] = section.properties['au:sectionClosed'];
  auEntities.itemsInGroup.push(current);
  auEntities.lastItem = current;
  auEntities.nextItem = next;
  return auEntities;
}

/**  order entity state items and sets 'au:pageId' property */
export function orderStateItemsFn(state: State): Node[] {
  const sortedItems: Node[] = [];
  // const firstPage = state.firstPage;
  const firstPage = state.entities[state.firstPage.id];

  let pageId = firstPage.id;
  let sectionId: string = null;
  let current = firstPage;
  let next = state.entities[current.properties['au:nextItemId']];
  while (current) {
    // eslint-disable-next-line no-console
    /* console.log(
      `current: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} next: ${next?.id} next.nodeType: ${next?.nodeType} `
    ); */

    if (current.nodeType === 'au:page') {
      pageId = current.id;
    }
    if (current.nodeType === 'au:itemSection') {
      sectionId = current.id;
    }
    current.properties['au:pageId'] = pageId;
    if (current.nodeType === 'au:itemQuestion' && current.properties['au:sectionId'] && current.properties['au:sectionId'] !== sectionId) {
      current.properties['au:sectionId'] = sectionId;
      current.properties['au:itemModified'] = true;
    }
    sortedItems.push(current);
    current = next;
    next = state.entities[current?.properties['au:nextItemId']];
    // eslint-disable-next-line no-console
    // console.log(`next: ${next}`);
  }
  // eslint-disable-next-line no-console
  // console.log(`sortedItems:  ${JSON.stringify(sortedItems)}`);
  return sortedItems;
}

export function removeItemsModifiedFn(state: State): State {
  // const sortedItems: Node[] = [];
  // const firstPage = state.firstPage;
  const firstPage = state.entities[state.firstPage.id];
  let current = firstPage;
  let next = state.entities[current.properties['au:nextItemId']];
  while (current) {
    // eslint-disable-next-line no-console
    /* console.log(
      `current: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} next: ${next?.id} next.nodeType: ${next?.nodeType} `
    ); */
    current.properties['au:itemModified'] = false;
    // sortedItems.push(current);
    current = next;
    next = state.entities[current?.properties['au:nextItemId']];
    // eslint-disable-next-line no-console
    // console.log(`next: ${next}`);
  }
  // eslint-disable-next-line no-console
  // console.log(`sortedItems:  ${JSON.stringify(sortedItems)}`);
  return state;
}

/** map nodeEntities to nodes and find first page */
export function setFirstPageState(itemEntries: NodeEntry[]): { items: Node[]; firstPage: Node } {
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

export function updateSelectedAuNodes(state: State, selectedItem: Node): State {
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

export function removeGroupFn(groupToRemoveState: State, state: State): State {
  const newState = groupToRemoveState;
  // const selectedNodeState = updateSelectedAuNodes(state, node);
  // const newIndexNodeState = updateSelectedAuNodes(state, newIndexNode);
  const prevItem = findPrevNodeFn(newState.selection.item, state);
  newState.entities[prevItem.id].properties['au:nextItemId'] = newState.selection.lastItem.properties['au:nextItemId'];
  return newState;
}

export function addGroupFn(groupToAddState: State, addLocationNode: Node, state: State): State {
  const newState = state;
  groupToAddState.selection.itemsInGroup.forEach((element) => {
    newState.entities[element.id] = element;
  });
  newState.entities[addLocationNode.id].properties['au:nextItemId'] = groupToAddState.selection.firstItem.id;
  newState.entities[groupToAddState.selection.lastItem.id].properties['au:nextItemId'] =
    newState.entities[addLocationNode.id].properties['au:nextItemId'];

  return newState;
}
