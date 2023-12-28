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

import { createReducer, on } from '@ngrx/store';
import { Node } from '@alfresco/js-api';
import * as AuTemplateActions from '../actions/au-template.actions';

export const auTemplateFeatureKey = 'auTemplate';

/* export interface TemplateData {
  // loaded: boolean;
  // templ: Node;
  // error: string | null;
} */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TemplateState {
  // readonly template: TemplateData;
  loaded: boolean;
  template: Node;
  error: string | null;
}

export interface AuTemplateStore {
  readonly auTemplate: TemplateState;
}

export const initialState: TemplateState = {
  template: null,
  loaded: false,
  error: null
};

export const reducer = createReducer(
  initialState,

  on(AuTemplateActions.loadAuTemplate, (state) => state),
  on(AuTemplateActions.loadAuTemplateSuccess, (state, action) => ({
    ...state,
    template: action.data,
    loaded: true
  })),
  on(AuTemplateActions.loadAuTemplateFailure, (state, action) => ({
    ...state,
    error: action.error,
    template: null,
    loaded: false
  }))
);
