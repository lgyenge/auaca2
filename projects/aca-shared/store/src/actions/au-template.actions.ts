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
import { Node } from '@alfresco/js-api';
import { addAuTemplateSuccessParams } from '../models/au-templ.model';

export const loadAuTemplate = createAction('[AuTemplate] Load AuTemplate');
export const loadAuTemplateSuccess = createAction('[AuTemplate] Load AuTemplate Success', props<{ data: Node }>());
export const loadAuTemplateFailure = createAction('[AuTemplate] Load AuTemplate Failure', props<{ error: any }>());

export const addAuTemplate = createAction('[AuTemplate] Add AuTemplate', props<{ templateId: string; pageNumber: number }>());
export const addAuTemplateSuccess = createAction('[AuTemplate] Add AuTemplate Success', props<{ params: addAuTemplateSuccessParams }>());
export const addAuTemplateFailure = createAction('[AuTemplate] Add AuTemplate Failure', props<{ error: any }>());

export const deleteAuTemplate = createAction('[AuTemplate] Delete AuTemplate', props<{ templateId: string; pageId: string }>());
export const deleteAuTemplateSuccess = createAction('[AuTemplate] Delete AuTemplate Success', props<{ templateId: string; pageId: string }>());
export const deleteAuTemplateFailure = createAction('[AuTemplate] Delete AuTemplate Failure', props<{ error: any }>());
