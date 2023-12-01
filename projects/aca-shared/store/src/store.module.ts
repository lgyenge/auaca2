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

import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { SnackbarEffects } from './effects/snackbar.effects';
import { DialogEffects } from './effects/dialog.effects';
import { RouterEffects } from './effects/router.effects';
import { StoreModule } from '@ngrx/store';
import { auPagesReducer } from './reducers/au-pages.reducer';
import * as fromAuCategory from './reducers/au-category.reducer';
import * as fromAuItem from './reducers/au-item.reducer';
import * as fromAuGlobalResponseSet from './reducers/au-global-response-set.reducer';
import * as fromAuResposeSet from './reducers/au-response-set.reducer';

import { AuPagesEffects, AuCategoryEffects } from './effects/au-templates.effects';

@NgModule({
  imports: [
    EffectsModule.forFeature([SnackbarEffects, DialogEffects, RouterEffects, AuPagesEffects, AuCategoryEffects]),
    StoreModule.forFeature('auPages', auPagesReducer),
    StoreModule.forFeature('auCategories', fromAuCategory.reducer),
    StoreModule.forFeature('auItem', fromAuItem.reducer),
    StoreModule.forFeature('auResponeSet', fromAuResposeSet.reducer),
    StoreModule.forFeature('auGlobalResponseSet', fromAuGlobalResponseSet.reducer)
  ]
})
export class SharedStoreModule {}
