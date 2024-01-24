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
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Node, NodeEntry } from '@alfresco/js-api';
import { addAuTemplateSuccessParams, AuItemSuccessParams } from '../models/au-templ.model';

// import { AuTempl } from '../models/au-templ.model';

// export const loadAuTempls = createAction('[AuTempl/API] Load AuTempls', props<{ auTempls: Node[] }>());
export const loadAuTempl = createAction('[AuTempl/API] Load AuTempl');
export const loadAuTemplSuccess = createAction('[AuTempl/API] Load AuTempl Success', props<{ data: Node }>());
export const loadAuTemplFailure = createAction('[AuTempl/API] Load AuTempl Failure', props<{ error: any }>());

// export const addAuTempl = createAction('[AuTempl/API] Add AuTempl', props<{ auTempl: Node }>());
export const addAuTempl = createAction('[AuTempl] Add AuTempl');
export const addAuTemplSuccess = createAction('[AuTempl] Add AuTempl Success', props<{ params: addAuTemplateSuccessParams }>());
export const addAuTemplFailure = createAction('[AuTempl] Add AuTempl Failure', props<{ error: any }>());

export const upsertAuTempl = createAction('[AuTempl/API] Upsert AuTempl', props<{ auTempl: Node }>());

export const addAuTempls = createAction('[AuTempl/API] Add AuTempls', props<{ auTempls: Node[] }>());

export const upsertAuTempls = createAction('[AuTempl/API] Upsert AuTempls', props<{ auTempls: Node[] }>());

export const updateAuTempl = createAction('[AuTempl/API] Update AuTempl', props<{ auTempl: Update<Node> }>());

export const updateAuTempls = createAction('[AuTempl/API] Update AuTempls', props<{ auTempls: Update<Node>[] }>());

// export const deleteAuTempl = createAction('[AuTempl/API] Delete AuTempl', props<{ id: string }>());
export const deleteAuTempl = createAction('[AuTempl] Delete AuTempl', props<{ templateId: string; pageId: string }>());
export const deleteAuTemplSuccess = createAction('[AuTempl] Delete AuTempl Success', props<{ templateId: string; pageId: string }>());
export const deleteAuTemplFailure = createAction('[AuTempl] Delete AuTempl Failure', props<{ error: any }>());

export const deleteAuTempls = createAction('[AuTempl/API] Delete AuTempls', props<{ ids: string[] }>());

export const clearAuTempls = createAction('[AuTempl/API] Clear AuTempls');

export const loadAuItems = createAction('[AuTempl/API] Load AuItems', props<{ templateId: string }>());
export const loadAuItemsSuccess = createAction('[AuTempl/API] Load AuItems Success', props<{ items: NodeEntry[] }>());
export const loadAuItemsFailure = createAction('[AuTempl/API] Load AuItems Failure', props<{ error: any }>());

export const selectAuItem = createAction('[AuTempl/API] Select AuItem', props<{ item: Node }>());
export const unSelectAuItem = createAction('[AuTempl/API] UnSelect AuItem');
export const toggleAuItemSelection = createAction('[AuTempl/API] Toggle AuItem Selection', props<{ item: Node }>());

export const addAuPage = createAction('[AuTempl/API] Add AuPage');
export const addAuPageSuccess = createAction('[AuTempl/API] Add AuPage Success', props<{ params: AuItemSuccessParams }>());
export const addAuPageFailure = createAction('[AuTempl/API] Add AuPage Failure', props<{ error: any }>());

/* export const deleteAuPage = createAction('[AuTempl/API] Delete AuPage', props<{ templateId: string; item: Node }>());
export const deleteAuPageSuccess = createAction('[AuTempl/API] Delete AuPage Success', props<{ templateId: string; pageId: string }>());
export const deleteAuPageFailure = createAction('[AuTempl/API] Delete AuPage Failure', props<{ error: any }>()); */

export const deleteAuItemGroup = createAction('[AuTempl/API] Delete AuItemGroup');
// export const deleteAuItemSuccess = createAction('[AuTempl/API] Delete AuItemGroup Success', props<{ templateId: string; pageId: string }>());
export const deleteAuItemGroupSuccess = createAction('[AuTempl/API] Delete AuItemGroup Success', props<{ params: AuItemSuccessParams }>());
export const deleteAuItemGroupFailure = createAction('[AuTempl/API] Delete AuItemGroup Failure', props<{ error: any }>());

export const addAuItem = createAction('[AuTempl/API] Add AuItem');
export const addAuItemSuccess = createAction('[AuTempl/API] Add AuItem Success', props<{ params: AuItemSuccessParams }>());
export const addAuItemFailure = createAction('[AuTempl/API] Add AuItem Failure', props<{ error: any }>());

export const addAuSection = createAction('[AuTempl/API] Add AuSection');
// export const addAuSectionSuccess = createAction('[AuTempl/API] Add AuSection Success', props<{ params: AuSectionSuccessParams }>());
export const addAuSectionFailure = createAction('[AuTempl/API] Add AuSection Failure', props<{ error: any }>());

// export const moveAuItem = createAction('[AuItem/API] Move AuItem', props<{ params: MovePageParams }>());
