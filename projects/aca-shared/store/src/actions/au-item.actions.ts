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
import { AuItem, MoveItemParams } from '../models/au-item.model';
import { NodePaging } from '@alfresco/js-api';
import { AuCategory } from '../models/au-category.model';

export const loadAuItems = createAction('[AuItem/API] Load AuItems');
export const loadAuItemsSuccess = createAction('[AuItems/API] Load AuItems Success', props<{ itemArray: (NodePaging | AuCategory)[] }>());
export const loadAuItemsFailure = createAction('[AuItems/API] Load AuItems Failure', props<{ error: any }>());

// export const addAuItem = createAction('[AuItem/API] Add AuItem', props<{ auItem: AuItem }>());
export const addAuItem = createAction('[AuItem/API] Add AuItem', props<{ category: AuCategory; itemNumber: number }>());
export const addAuItemSuccess = createAction('[AuItems/API] Add AuItem Success', props<{ category: AuCategory; item: AuItem; itemNumber: number }>());
export const addAuItemFailure = createAction('[AuItems/API] Add AuItem Failure', props<{ error: any }>());

export const moveAuItem = createAction('[AuItem/API] Move AuItem', props<{ params: MoveItemParams }>());

export const deleteAuItem = createAction('[AuItem/API] Delete AuItem', props<{ category: AuCategory; itemId: string }>());
export const deleteAuItemSuccess = createAction('[AuItems/API] Delete AuItem Success', props<{ category: AuCategory; itemId: string }>());
export const deleteAuItemFailure = createAction('[AuItems/API] Delete AuItem Failure', props<{ error: any }>());

export const upsertAuItem = createAction('[AuItem/API] Upsert AuItem', props<{ auItem: AuItem }>());

export const addAuItems = createAction('[AuItem/API] Add AuItems', props<{ auItems: AuItem[] }>());

export const upsertAuItems = createAction('[AuItem/API] Upsert AuItems', props<{ auItems: AuItem[] }>());

export const updateAuItem = createAction('[AuItem/API] Update AuItem', props<{ auItem: Update<AuItem> }>());

export const updateAuItems = createAction('[AuItem/API] Update AuItems', props<{ auItems: Update<AuItem>[] }>());

// export const deleteAuItem = createAction('[AuItem/API] Delete AuItem', props<{ id: string }>());

export const deleteAuItems = createAction('[AuItem/API] Delete AuItems', props<{ ids: string[] }>());

export const clearAuItems = createAction('[AuItem/API] Clear AuItems');
