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
import { Node } from '@alfresco/js-api';
import { AuEntitiesParams } from '../models/au-templ.model';

export function findPrevNodeFn(node: Node, state: State): Node {
  let prev = state.firstPage;
  while (prev.properties['au:nextItemId'] && prev.properties['au:nextItemId'] !== node.id) {
    prev = prev.properties['au:nextItemId'];
  }
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
export function setPageItemsFn(page: Node, state: State): AuEntitiesParams {
  const auEntities: AuEntitiesParams = {
    prevItem: null,
    firstItem: page,
    lastItem: null,
    itemsInGroup: [],
    newItem: null
  };
  let current = page;
  let next = state.entities[current.properties['au:nextItemId']];
  while (!current.properties['au:nextItemId'] && next?.nodeType !== 'au:page') {
    current.properties['au:pageId'] = page.id;
    auEntities.itemsInGroup.push(current);
    current = next;
    next = state.entities[current.properties['au:nextItemId']];
  }
  auEntities.lastItem = current;
  return auEntities;
}

/**  order entity state items and sets 'au:pageId' property */
export function orderStateItemsFn(state: State): Node[] {
  const sortedItems: Node[] = [];
  const firstPage = state.firstPage;
  let pageId = firstPage.id;
  let current = firstPage;
  let next = state.entities[current.properties['au:nextItemId']];
  while (current) {
    // eslint-disable-next-line no-console
    console.log(
      `current: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} next: ${next?.id} next.nodeType: ${next?.nodeType} `
    );

    if (current.nodeType === 'au:page') {
      pageId = current.id;
    }
    current.properties['au:pageId'] = pageId;
    sortedItems.push(current);
    current = next;
    next = state.entities[current?.properties['au:nextItemId']];
    // eslint-disable-next-line no-console
    console.log(`next: ${next}`);
  }
  // eslint-disable-next-line no-console
  // console.log(`sortedItems:  ${JSON.stringify(sortedItems)}`);
  return sortedItems;
}
