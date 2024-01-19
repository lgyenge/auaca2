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

import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AuCategory, MoveCategoryParams } from '../models/au-category.model';
import { NodePaging, Node } from '@alfresco/js-api';
// import { AuPage } from '../models/au-templates.model';

export const loadAuCategories = createAction('[AuCategory/API] Load AuCategories');
export const loadAuCategoriesSuccess = createAction('[AuCategories/API] Load AuCategories Success', props<{ catArray: (NodePaging | Node)[] }>());
export const loadAuCategoriesFailure = createAction('[AuCategories/API] Load AuCategories Failure', props<{ error: any }>());

// export const addAuCategory = createAction('[AuCategory/API] Add AuCategory', props<{ auCategory: AuCategory }>());
export const addAuCategory = createAction('[AuCategory/API] Add AuCategory', props<{ page: Node; categoryNumber: number }>());
export const addAuCategorySuccess = createAction(
  '[AuCategory/API] Add AuCategory Success',
  props<{ page: Node; category: AuCategory; categoryNumber: number }>()
);
export const addAuCategoryFailure = createAction('[AuCategory/API] Add AuCategory Failure', props<{ error: any }>());

export const moveAuCategory = createAction('[AuCategory/API] Move AuCategory', props<{ params: MoveCategoryParams }>());

export const deleteAuCategory = createAction('[AuCategory/API] Delete AuCategory', props<{ page: Node; categoryId: string }>());
export const deleteAuCategorySuccess = createAction('[AuCategory/API] Delete AuCategory Success', props<{ page: Node; categoryId: string }>());
export const deleteAuCategoryFailure = createAction('[AuCategory/API] Delete AuCategory Failure', props<{ error: any }>());

export const upsertAuCategory = createAction('[AuCategory/API] Upsert AuCategory', props<{ auCategory: AuCategory }>());

export const addAuCategories = createAction('[AuCategory/API] Add AuCategories', props<{ auCategories: AuCategory[] }>());

export const upsertAuCategories = createAction('[AuCategory/API] Upsert AuCategories', props<{ auCategories: AuCategory[] }>());

export const updateAuCategory = createAction('[AuCategory/API] Update AuCategory', props<{ auCategory: Update<AuCategory> }>());

export const updateAuCategories = createAction('[AuCategory/API] Update AuCategories', props<{ auCategories: Update<AuCategory>[] }>());

// export const deleteAuCategory = createAction('[AuCategory/API] Delete AuCategory', props<{ id: string }>());

export const deleteAuCategories = createAction('[AuCategory/API] Delete AuCategories', props<{ ids: string[] }>());

export const clearAuCategories = createAction('[AuCategory/API] Clear AuCategories');

export const selectAuCategory = createAction('[AuCategory/API] Select AuCategory', props<{ id: string }>());
export const unSelectAuCategory = createAction('[AuCategory/API] UnSelect AuCategory');
export const toggleAuCategorySelection = createAction('[AuCategory/API] Toggle AuCategory Selection', props<{ id: string }>());
