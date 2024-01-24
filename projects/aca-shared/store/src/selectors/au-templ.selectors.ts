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
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/au-templ.reducer';
import * as fromAuTempl from '../reducers/au-templ.reducer';
import { Node } from '@alfresco/js-api';
import { findPrevNodeFn } from '../au-helpers/au-store-helpers';

// Lookup the 'Templ' feature state managed by NgRx
const selectState = createFeatureSelector<State>(fromAuTempl.auTemplsFeatureKey);

export const getAuTemplsAll = createSelector(selectState, (state: State) => fromAuTempl.selectAll(state));
export const getAuTemplsIds = createSelector(selectState, (state: State) => fromAuTempl.selectIds(state));
export const getAuTemplsEntities = createSelector(selectState, (state: State) => fromAuTempl.selectEntities(state));

export const getAuTemplsLoaded = createSelector(selectState, (state: State) => state.loaded);
export const selectTemplsReady = createSelector(getAuTemplsLoaded, getAuTemplsAll, (ready, items) => ({ ready, items }));

// export const getSelectedAuTempl = createSelector(selectState, (state: State) => state.selectedAuTemplId);
// export const getSelectedAuItem = createSelector(selectState, (state: State) => state.selectedAuItem);
export const getSelectedAuItem = createSelector(selectState, (state: State) => state.selection.item);

export const getAuState = createSelector(selectState, (state: State) => state);

export const getSelectedId = createSelector(selectState, (state: State) => state.selection.item.id);

export const getEntity = createSelector(getAuTemplsEntities, getSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);

export const getFirstPage = createSelector(selectState, (state) => state.firstPage);

export const selectTemplate = createSelector(selectState, (state) => state.template);

export const getAuSelection = createSelector(selectState, (state) => state.selection);

/** selector for add page */
/* export const getAddPageState = createSelector(getAuTemplsEntities, selectState, (entities, state: State) => {
  // const items = fromAuTempl.selectAll(state);
  let current = state.selectedAuItem;
  let next: Node = null;
  // eslint-disable-next-line no-console
  console.log(
    `currentId: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} nextId: ${next?.id} next.nodeType: ${next?.nodeType} `
  );

  if (current?.properties['au:nextItemId']) {
    next = entities[current.properties['au:nextItemId']];
    // eslint-disable-next-line no-console
    console.log(
      `currentId: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} nextId: ${next?.id} next.nodeType: ${next?.nodeType} `
    );

    while (!(current.properties['au:nextItemId'] == null) && next?.nodeType !== 'au:page') {
      // eslint-disable-next-line no-console
      console.log(
        `currentId: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} nextId: ${next?.id} next.nodeType: ${next?.nodeType} `
      );
      current = next;
      // eslint-disable-next-line no-console
      console.log(
        `currentId: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} nextId: ${next?.id} next.nodeType: ${next?.nodeType} `
      );
      next = entities[current.properties['au:nextItemId']];
      // eslint-disable-next-line no-console
      console.log(
        `currentId: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} nextId: ${next?.id} next.nodeType: ${next?.nodeType} `
      );
    }
    if (current.properties['au:nextItemId'] === null) {
      next = null;
      // eslint-disable-next-line no-console
      console.log(
        `currentId: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} nextId: ${next?.id} next.nodeType: ${next?.nodeType} `
      );
    }
    if (current.properties['au:nextItemId'] === undefined) {
      // eslint-disable-next-line no-console
      console.log(
        `currentId: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} nextId: ${next?.id} next.nodeType: ${next?.nodeType} `
      );
      next = null;
    }
  }
  return { prev: current, next: next };
}); */

/** selector for delete page and all items of page*/
export const getdeletePageState = createSelector(getAuTemplsEntities, getSelectedAuItem, selectState, (entities, selectedItem, state: State) => {
  let current = selectedItem;
  let next: Node = findPrevNodeFn(selectedItem, state);
  // eslint-disable-next-line no-console
  console.log(
    `currentId: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} nextId: ${next?.id} next.nodeType: ${next?.nodeType} `
  );

  if (current?.properties['au:nextItemId']) {
    next = entities[current.properties['au:nextItemId']];
    // eslint-disable-next-line no-console
    console.log(
      `currentId: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} nextId: ${next?.id} next.nodeType: ${next?.nodeType} `
    );

    while (!(current.properties['au:nextItemId'] == null) && next?.nodeType !== 'au:page') {
      // eslint-disable-next-line no-console
      console.log(
        `currentId: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} nextId: ${next?.id} next.nodeType: ${next?.nodeType} `
      );
      current = next;
      // eslint-disable-next-line no-console
      console.log(
        `currentId: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} nextId: ${next?.id} next.nodeType: ${next?.nodeType} `
      );
      next = entities[current.properties['au:nextItemId']];
      // eslint-disable-next-line no-console
      console.log(
        `currentId: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} nextId: ${next?.id} next.nodeType: ${next?.nodeType} `
      );
    }
    if (current.properties['au:nextItemId'] === null) {
      next = null;
      // eslint-disable-next-line no-console
      console.log(
        `currentId: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} nextId: ${next?.id} next.nodeType: ${next?.nodeType} `
      );
    }
    if (current.properties['au:nextItemId'] === undefined) {
      // eslint-disable-next-line no-console
      console.log(
        `currentId: ${current.id} current-nextItemId ${current.properties['au:nextItemId']} nextId: ${next?.id} next.nodeType: ${next?.nodeType} `
      );
      next = null;
    }
  }
  return { prev: current, next: next };
});

/*
  export const getAddPageState = createSelector(getAuTemplsEntities, selectState, (entities, state: State) => {
    // const items = fromAuTempl.selectAll(state);
    let current = state.selectedAuItem;
    let next: Node = null;
    if (current?.properties['au:nextItemId']) {
      next = entities[current.properties['au:nextItemId']];
      while (!(current.properties['au:nextItemId'] == null) && next?.nodeType !== 'au:page') {
        current = next;
        next = entities[current.properties['au:nextItemId']];
      }
      if (!current.properties['au:nextItemId']) {
        next = null;
      }
    }
    return { prev: current, next: next };
  }); */
