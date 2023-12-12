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
import { Node, NodeEntry } from '@alfresco/js-api';
import { moveItemInArray } from '@angular/cdk/drag-drop';

export interface AuPagesData extends EntityState<AuPage> {
  selectedAuPageId?: string | number;
  loading: boolean;
  error?: string | null;
}

export interface AuPagesStore {
  readonly auPages: AuPagesData;
}

export const auPagesAdapter: EntityAdapter<AuPage> = createEntityAdapter<AuPage>({
  sortComparer: false
});
export const initialState: AuPagesData = auPagesAdapter.getInitialState({
  error: '',
  selectedProductId: null,
  loading: false
});

export const auPagesReducer = createReducer(
  initialState,
  on(AuPagesActions.addAuPage, (state) => ({ ...state, loaded: false, error: null })),
  on(AuPagesActions.addAuPageSuccess, (state: AuPagesData, { params: { node, pageNumber } }) => {
    const nodes = selectAll(state);
    nodes.splice(pageNumber, 0, node);
    return auPagesAdapter.setAll(nodes, { ...state });
  }),
  on(AuPagesActions.addAuPageFailure, (state, { error }) => ({ ...state, error })),

  on(AuPagesActions.deleteAuPage, (state) => ({ ...state, loaded: false, error: null })),
  // on(AuPagesActions.deleteAuPage, (state, action) => auPagesAdapter.removeOne(action.id, state)),
  // on(AuPagesActions.deleteAuPage, (state, action) => auPagesAdapter.removeOne(pageId, state)),

  on(AuPagesActions.deleteAuPageSuccess, (state: AuPagesData, { pageId }) => auPagesAdapter.removeOne(pageId, state)),

  /* on(AuPagesActions.deleteAuPageSuccess, (state: AuPagesData, { templateId, pageId }) => {
    const nodes = selectAll(state);
    // nodes.splice(pageNumber, 0, node);
    return auPagesAdapter.setAll(nodes, { ...state });
  }), */
  on(AuPagesActions.deleteAuPageFailure, (state, { error }) => ({ ...state, error })),

  on(AuPagesActions.moveAuPage, (state, { params: { oldIndex, newIndex } }) => {
    const entities = selectAll(state);
    moveItemInArray<AuPage>(entities, oldIndex, newIndex);
    return auPagesAdapter.setAll(entities, { ...state, loaded: true });
  }),

  on(AuPagesActions.upsertAuPage, (state, action) => auPagesAdapter.upsertOne(action.auPage, state)),
  on(AuPagesActions.addAuPages, (state, action) => auPagesAdapter.addMany(action.auPages, state)),
  on(AuPagesActions.upsertAuPages, (state, action) => auPagesAdapter.upsertMany(action.auPages, state)),
  on(AuPagesActions.updateAuPage, (state, action) => auPagesAdapter.updateOne(action.auPage, state)),
  on(AuPagesActions.updateAuPages, (state, action) => auPagesAdapter.updateMany(action.auPages, state)),
  on(AuPagesActions.deleteAuPages, (state, action) => auPagesAdapter.removeMany(action.ids, state)),
  on(AuPagesActions.loadAuPages, (state) => ({ ...state, loaded: false, error: null })),
  // on(AuPagesActions.loadAuPagesSuccess, (state, action) => auPagesAdapter.setAll(action.AuPages, { ...state, loaded: true })),
  on(AuPagesActions.loadAuPagesSuccess, (state: AuPagesData, { params: { nodePaging, node } }) => {
    const nodes: Node[] = [];
    nodePaging.list.entries.forEach((element) => {
      nodes.push(element.entry);
    });
    // eslint-disable-next-line no-console
    // console.log('iDs' + node.properties['au:pagesOrder']);
    // map((nodePaging) => nodePaging.list.entries.map((x) => x.entry)),
    const iDs: string[] = node.properties['au:pagesOrder'].split(',');
    const sortedNodes: Node[] = [];
    iDs.forEach((e) => {
      nodePaging.list.entries.find(checkId);

      function checkId(entry: NodeEntry) {
        if (e === entry.entry.id) {
          sortedNodes.push(entry.entry);
        }
      }
    });
    return auPagesAdapter.setAll(sortedNodes, { ...state, loaded: true });
  }),

  on(AuPagesActions.loadAuPagesFailure, (state, { error }) => ({ ...state, error })),

  on(AuPagesActions.clearAuPages, (state) => auPagesAdapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = auPagesAdapter.getSelectors();

/* export function auReducer(state: AuPagesData | undefined, action: Action) {
  return auPagesReducer(state, action);
} */
