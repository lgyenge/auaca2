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
import * as AuCategoryActions from '../actions/au-category.actions';
import { AuCategory } from '../models/au-category.model';
// import { Node } from '@alfresco/js-api';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { NodeEntry, NodePaging } from '@alfresco/js-api';

export const auCategoriesFeatureKey = 'auCategories';
export interface AuCategoryData extends EntityState<AuCategory> {
  selectedAuCategoryId?: string | number;
  loaded: boolean;
  error?: string | null;
}

export interface AuCategoryStore {
  readonly auCategories: AuCategoryData;
}

export const adapter: EntityAdapter<AuCategory> = createEntityAdapter<AuCategory>({
  sortComparer: false
});
export const initialState: AuCategoryData = adapter.getInitialState({
  error: '',
  selectedAuCategoryId: null,
  loaded: false
});

export const reducer = createReducer(
  initialState,
  on(AuCategoryActions.addAuCategory, (state) => ({ ...state })),
  on(AuCategoryActions.addAuCategorySuccess, (state: AuCategoryData, { category, categoryNumber }) => {
    const nodes = selectAll(state);
    nodes.splice(categoryNumber, 0, category);
    return adapter.setAll(nodes, { ...state, loaded: true, error: null });
  }),
  on(AuCategoryActions.addAuCategoryFailure, (state, { error }) => ({ ...state, error })),
  on(AuCategoryActions.deleteAuCategory, (state) => ({ ...state })),
  on(AuCategoryActions.deleteAuCategorySuccess, (state: AuCategoryData, { categoryId }) =>
    adapter.removeOne(categoryId, { ...state, loaded: true, error: null })
  ),
  on(AuCategoryActions.deleteAuCategoryFailure, (state, { error }) => ({ ...state, error })),
  on(AuCategoryActions.moveAuCategory, (state, { params: { node, oldIndex, newIndex } }) => {
    const entities = selectAll(state);
    let foundIndex = 0;
    entities.find(startFn);
    function startFn(element, index) {
      if (element.id === node.id) {
        foundIndex = index;
      }
    }
    // console.log(`nodeId:  ${node.id} `);
    // console.log(`előtte oldIndex:  ${oldIndex} - newIndex: ${newIndex} - foundIndex: ${foundIndex}`);
    const oldIndex2 = foundIndex;
    const newIndex2 = foundIndex + (newIndex - oldIndex);
    // console.log(`utána oldIndex2:  ${oldIndex2} - newIndex2: ${newIndex2} - foundIndex: ${foundIndex}`);
    // console.log(`entities:  ${JSON.stringify(entities)}`);
    moveItemInArray<AuCategory>(entities, oldIndex2, newIndex2);
    // console.log(`entities utána:  ${JSON.stringify(entities)}`);
    return adapter.setAll(entities, { ...state, loaded: true });
  }),
  on(AuCategoryActions.upsertAuCategory, (state, action) => adapter.upsertOne(action.auCategory, state)),
  on(AuCategoryActions.addAuCategories, (state, action) => adapter.addMany(action.auCategories, state)),
  on(AuCategoryActions.upsertAuCategories, (state, action) => adapter.upsertMany(action.auCategories, state)),
  on(AuCategoryActions.updateAuCategory, (state, action) => adapter.updateOne(action.auCategory, state)),
  on(AuCategoryActions.updateAuCategories, (state, action) => adapter.updateMany(action.auCategories, state)),
  on(AuCategoryActions.deleteAuCategories, (state, action) => adapter.removeMany(action.ids, state)),
  on(AuCategoryActions.loadAuCategories, (state) => ({ ...state, loaded: false, error: null })),

  on(AuCategoryActions.loadAuCategoriesSuccess, (state, action) => {
    const sortedNodes: AuCategory[] = [];
    // eslint-disable-next-line no-console
    // console.log(`category reducer arr: ${JSON.stringify(action.catArray)}`);
    for (let i = 0; i < action.catArray.length; i = i + 2) {
      // eslint-disable-next-line no-console
      // console.log(`action.catArray[${i}]:  ${JSON.stringify(action.catArray[i])}`);
      // eslint-disable-next-line no-console
      // console.log(`action.catArray[${i + 1}]:  ${JSON.stringify(action.catArray[i + 1])}`);
      const iDs: string[] = (action.catArray[i + 1] as AuCategory).properties['au:pagesOrder']?.split(',');
      iDs?.forEach((e) => {
        (action.catArray[i] as NodePaging).list.entries.find(checkId);
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
  on(AuCategoryActions.loadAuCategoriesFailure, (state, { error }) => ({ ...state, error })),
  on(AuCategoryActions.clearAuCategories, (state) => adapter.removeAll({ ...state, loaded: false, error: null })),

  on(AuCategoryActions.selectAuCategory, (state, action) => ({ ...state, selectedAuCategoryId: action.id })),
  on(AuCategoryActions.unSelectAuCategory, (state) => ({ ...state, selectedAuCategoryId: null })),
  on(AuCategoryActions.toggleAuCategorySelection, (state, action) => {
    if (state.selectedAuCategoryId) {
      return { ...state, selectedAuCategoryId: null };
    } else {
      return { ...state, selectedAuCategoryId: action.id };
    }
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
