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

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuPageActions from '../actions/au-templates-actions';
// import { NodesApiService } from '@alfresco/adf-content-services';
// import { AuTemplatesService } from '../../../src/lib/services/au-templates.service';
// import { AuTemplatesService } from '../../../src/public-api';
import { NodesApiService } from '@alfresco/adf-content-services';

@Injectable()
export class AuPageEffects {
  // private nodesApi = inject(NodesApiService);
  // private auTemplates = inject(AuTemplatesService);
  private actions$ = inject(Actions);
  private nodesApi = inject(NodesApiService);

  loadAuPages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuPageActions.loadAuPages),
      concatMap((templateId) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        // this.auTemplates.getAuPages('91f74719-c33e-4814-a630-d78022a6cc04').pipe(
        // this.auTemplates.getAuPages(templateId.template).pipe(
        this.nodesApi.getNodeChildren(templateId.template).pipe(
          // eslint-disable-next-line no-console
          // tap(console.log('salami')),
          // eslint-disable-next-line no-console
          tap((value) => console.log('valami' + value)),
          map((nodePaging) => nodePaging.list.entries.map((x) => x.entry)),
          map((data) => AuPageActions.loadAuPagesSuccess({ AuPages: data })),
          catchError((error) => of(AuPageActions.loadAuPagesFailure({ error })))
        )
      )
    );
  });

  constructor(/* private actions$: Actions, private nodesApi: NodesApiService, private auTemplates: AuTemplatesService */) {}
}
