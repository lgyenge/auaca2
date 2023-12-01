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

import { AuGlobalResponseSet } from '../models/au-global-response-set.model';

export const loadAuGlobalResponseSets = createAction('[AuGlobalResponseSet/API] Load AuGlobalResponseSets', props<{ templateId: string }>());
export const loadAuGlobalResponseSetsSuccess = createAction(
  '[AuGlobalResponseSets/API] Load AuGlobalResponseSets Success',
  props<{ AuGlobalResponseSets: AuGlobalResponseSet[] }>()
);
export const loadAuGlobalResponseSetsFailure = createAction('[AuGlobalResponseSets/API] Load AuGlobalResponseSets Failure', props<{ error: any }>());

export const addAuGlobalResponseSet = createAction(
  '[AuGlobalResponseSet/API] Add AuGlobalResponseSet',
  props<{ auGlobalResponseSet: AuGlobalResponseSet }>()
);

export const upsertAuGlobalResponseSet = createAction(
  '[AuGlobalResponseSet/API] Upsert AuGlobalResponseSet',
  props<{ auGlobalResponseSet: AuGlobalResponseSet }>()
);

export const addAuGlobalResponseSets = createAction(
  '[AuGlobalResponseSet/API] Add AuGlobalResponseSets',
  props<{ auGlobalResponseSets: AuGlobalResponseSet[] }>()
);

export const upsertAuGlobalResponseSets = createAction(
  '[AuGlobalResponseSet/API] Upsert AuGlobalResponseSets',
  props<{ auGlobalResponseSets: AuGlobalResponseSet[] }>()
);

export const updateAuGlobalResponseSet = createAction(
  '[AuGlobalResponseSet/API] Update AuGlobalResponseSet',
  props<{ auGlobalResponseSet: Update<AuGlobalResponseSet> }>()
);

export const updateAuGlobalResponseSets = createAction(
  '[AuGlobalResponseSet/API] Update AuGlobalResponseSets',
  props<{ auGlobalResponseSets: Update<AuGlobalResponseSet>[] }>()
);

export const deleteAuGlobalResponseSet = createAction('[AuGlobalResponseSet/API] Delete AuGlobalResponseSet', props<{ id: string }>());

export const deleteAuGlobalResponseSets = createAction('[AuGlobalResponseSet/API] Delete AuGlobalResponseSets', props<{ ids: string[] }>());

export const clearAuGlobalResponseSets = createAction('[AuGlobalResponseSet/API] Clear AuGlobalResponseSets');
