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
import { AuPage, addAuPagesSuccessParams, addAuPageSuccessParams, MovePageParams } from '../models/au-templates.model';

export const loadAuPages = createAction('[AuPage/API] Load AuPages', props<{ templateId: string }>());
export const loadAuPagesSuccess = createAction('[AuPages/API] Load AuPages Success', props<{ params: addAuPageSuccessParams }>());
export const loadAuPagesFailure = createAction('[AuPages/API] Load AuPages Failure', props<{ error: any }>());

export const addAuPage = createAction('[AuPage/API] Add AuPage', props<{ templateId: string; pageNumber: number }>());
export const addAuPageSuccess = createAction('[AuPages/API] Add AuPage Success', props<{ params: addAuPagesSuccessParams }>());
export const addAuPageFailure = createAction('[AuPages/API] Add AuPage Failure', props<{ error: any }>());

export const moveAuPage = createAction('[AuPage/API] Move AuPage', props<{ params: MovePageParams }>());

export const deleteAuPage = createAction('[AuPage/API] Delete AuPage', props<{ templateId: string; pageId: string }>());
export const deleteAuPageSuccess = createAction('[AuPages/API] Delete AuPage Success', props<{ templateId: string; pageId: string }>());
export const deleteAuPageFailure = createAction('[AuPages/API] Delete AuPage Failure', props<{ error: any }>());

export const upsertAuPage = createAction('[AuPage/API] Upsert AuPage', props<{ auPage: AuPage }>());

export const addAuPages = createAction('[AuPage/API] Add AuPages', props<{ auPages: AuPage[] }>());

export const upsertAuPages = createAction('[AuPage/API] Upsert AuPages', props<{ auPages: AuPage[] }>());

export const updateAuPage = createAction('[AuPage/API] Update AuPage', props<{ auPage: Update<AuPage> }>());

export const updateAuPages = createAction('[AuPage/API] Update AuPages', props<{ auPages: Update<AuPage>[] }>());

// export const deleteAuPage = createAction('[AuPage/API] Delete AuPage', props<{ id: string }>());

export const deleteAuPages = createAction('[AuPage/API] Delete AuPages', props<{ ids: string[] }>());

export const clearAuPages = createAction('[AuPage/API] Clear AuPages');
