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

import { AuResponseSet } from '../models/au-response-set.model';

export const loadAuResponseSets = createAction('[AuResponseSet/API] Load AuResponseSets', props<{ templateId: string }>());
export const loadAuResponseSetsSuccess = createAction(
  '[AuResponseSets/API] Load AuResponseSets Success',
  props<{ AuResponseSets: AuResponseSet[] }>()
);
export const loadAuResponseSetsFailure = createAction('[AuResponseSets/API] Load AuResponseSets Failure', props<{ error: any }>());

export const addAuResponseSet = createAction('[AuResponseSet/API] Add AuResponseSet', props<{ auResponseSet: AuResponseSet }>());

export const upsertAuResponseSet = createAction('[AuResponseSet/API] Upsert AuResponseSet', props<{ auResponseSet: AuResponseSet }>());

export const addAuResponseSets = createAction('[AuResponseSet/API] Add AuResponseSets', props<{ auResponseSets: AuResponseSet[] }>());

export const upsertAuResponseSets = createAction('[AuResponseSet/API] Upsert AuResponseSets', props<{ auResponseSets: AuResponseSet[] }>());

export const updateAuResponseSet = createAction('[AuResponseSet/API] Update AuResponseSet', props<{ auResponseSet: Update<AuResponseSet> }>());

export const updateAuResponseSets = createAction('[AuResponseSet/API] Update AuResponseSets', props<{ auResponseSets: Update<AuResponseSet>[] }>());

export const deleteAuResponseSet = createAction('[AuResponseSet/API] Delete AuResponseSet', props<{ id: string }>());

export const deleteAuResponseSets = createAction('[AuResponseSet/API] Delete AuResponseSets', props<{ ids: string[] }>());

export const clearAuResponseSets = createAction('[AuResponseSet/API] Clear AuResponseSets');
