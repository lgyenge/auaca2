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
// import { AuPage } from '../models/au-templates.model';
import { Node } from '@alfresco/js-api';
// import { Node, NodeEntry } from '@alfresco/js-api';

// import { moveItemInArray } from '@angular/cdk/drag-drop';

export const auPagesFeatureKey = 'auPages';
export interface AuPagesData extends EntityState<Node> {
  selectedAuPageId: string | number;
  //  loading: boolean;
  //  eslint-disable-next-line @cspell/spellchecker
  loaded: boolean;
  error: string | null;
}

export interface AuPagesStore {
  readonly auPages: AuPagesData;
}

export const auPagesAdapter: EntityAdapter<Node> = createEntityAdapter<Node>({
  sortComparer: false
});
export const initialState: AuPagesData = auPagesAdapter.getInitialState({
  error: '',
  selectedAuPageId: null,
  // loading: false
  loaded: false
});

export const auPagesReducer = createReducer(
  initialState,
  // on(AuPagesActions.addAuPage, (state) => ({ ...state })),
  /*  on(AuPagesActions.addAuPageSuccess, (state: AuPagesData, { params: { node, pageNumber } }) => {
    const nodes = selectAll(state);
    nodes.splice(pageNumber, 0, node);
    return auPagesAdapter.setAll(nodes, { ...state, loaded: true, error: null });
  }),
  on(AuPagesActions.addAuPageFailure, (state, { error }) => ({ ...state, error })),
  on(AuPagesActions.deleteAuPage, (state) => ({ ...state })),
  on(AuPagesActions.deleteAuPageSuccess, (state: AuPagesData, { pageId }) =>
    auPagesAdapter.removeOne(pageId, { ...state, loaded: true, error: null })
  ),
  on(AuPagesActions.deleteAuPageFailure, (state, { error }) => ({ ...state, error })),
  on(AuPagesActions.moveAuPage, (state, { params: { oldIndex, newIndex } }) => {
    const entities = selectAll(state);
    moveItemInArray<Node>(entities, oldIndex, newIndex);
    return auPagesAdapter.setAll(entities, { ...state, loaded: true });
  }), */
  on(AuPagesActions.upsertAuPage, (state, action) => auPagesAdapter.upsertOne(action.auPage, state)),
  on(AuPagesActions.addAuPages, (state, action) => auPagesAdapter.addMany(action.auPages, state)),
  on(AuPagesActions.upsertAuPages, (state, action) => auPagesAdapter.upsertMany(action.auPages, state)),
  on(AuPagesActions.updateAuPage, (state, action) => auPagesAdapter.updateOne(action.auPage, state)),
  on(AuPagesActions.updateAuPages, (state, action) => auPagesAdapter.updateMany(action.auPages, state)),

  on(AuPagesActions.deleteAuPages, (state, action) => auPagesAdapter.removeMany(action.ids, state)),
  on(AuPagesActions.loadAuPages, (state) => ({ ...state, loaded: false, error: null })),

  /*  on(AuPagesActions.loadAuPagesSuccess, (state: AuPagesData, { params: { nodePaging, node } }) => {
    const iDs: string[] = node.properties['au:pagesOrder']?.split(',');
    const sortedNodes: Node[] = [];
    iDs?.forEach((e) => {
      nodePaging.list.entries.find(checkId);

      function checkId(entry: NodeEntry) {
        if (e === entry.entry.id) {
          sortedNodes.push(entry.entry);
        }
      }
    });
    // es lint-disable-next-line no-console
    // console.log(`sorted nodes:  ${JSON.stringify(sortedNodes)}`);
    return auPagesAdapter.setAll(sortedNodes, { ...state, loaded: true });
  }), */
  on(AuPagesActions.loadAuPagesFailure, (state, { error }) => ({ ...state, error })),
  on(AuPagesActions.clearAuPages, (state) => auPagesAdapter.removeAll({ ...state, loaded: false, error: null })),
  // on(AuPagesActions.selectAuPage, (state, { id }) => Object.assign({ ...state, selectedPageId: id })),
  on(AuPagesActions.selectAuPage, (state, action) => ({ ...state, selectedAuPageId: action.id })),
  on(AuPagesActions.unSelectAuPage, (state) => ({ ...state, selectedAuPageId: null })),
  on(AuPagesActions.toggleAuPageSelection, (state, action) => {
    if (state.selectedAuPageId) {
      return { ...state, selectedAuPageId: null };
    } else {
      return { ...state, selectedAuPageId: action.id };
    }
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } = auPagesAdapter.getSelectors();

/* export function auReducer(state: AuPagesData | undefined, action: Action) {
  return auPagesReducer(state, action);
} */
