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

import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, map, concatMap, switchMap, take, } from 'rxjs/operators';
// import { EMPTY, of } from 'rxjs';
// import * as AuTemplateActions from '../actions/au-template.actions';
// import * as AuTemplActions from '../actions/au-templ.actions';

// import { AuPagesStore } from '../reducers/au-pages.reducer';
// import { Node } from '@alfresco/js-api';
// import { Store } from '@ngrx/store';

// import { auTemplatesService } from '../services/au-templates.service'; // import ok
// import { getCurrentFolder, AppStore } from '../public-api';

@Injectable()
export class AuTemplateEffects {
  // private auTemplates = inject(auTemplatesService);
  // private actions$ = inject(Actions);
  // private auStore = inject(Store<AuPagesStore>);
  // private store = inject(Store<AppStore>);
  /* loadAuTemplates$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuTemplateActions.loadAuTemplate),
      concatMap(() =>
        EMPTY.pipe(
          map((data) => AuTemplateActions.loadAuTemplateSuccess({ data })),
          catchError((error) => of(AuTemplateActions.loadAuTemplateFailure({ error })))
        )
      )
    );
  }); */
  /*
  addAuTemplate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuTemplateActions.addAuTemplate),
        map(() => {
          this.store
            .select(getCurrentFolder)
            .pipe(
              switchMap((folder) => this.auTemplates.addTemplate(folder.id)),
              take(1)
            )
            .subscribe((data) => {
              if (data) {
                this.store.dispatch(AuTemplActions.addAuTemplSuccess({ params: data }));
              }
            });
        })
      ),
    { dispatch: false }
  ); */
  /*
  addAuTemplate2$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuTemplateActions.addAuTemplate),
        concatMap(() => {
          return this.store.select(getCurrentFolder).pipe(
            concatMap((folder) => this.auTemplates.addTemplate(folder.id)),
            map((data) => AuTemplActions.addAuTemplSuccess({ params: data })),
            catchError((error) => of(AuTemplActions.addAuTemplFailure({ error })))
          );
        })
      )
    // { dispatch: false }
  );
 */
  /*
  addAuTemplateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuTemplateActions.addAuTemplateSuccess),
        map((action) => this.auStore.dispatch(loadAuItems()))
      ),
    { dispatch: false }
  );

 */
  /* deleteAuTemplate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuTemplateActions.deleteAuTemplate),
      concatMap((action) => {
        return this.auTemplates.deleteTemplateNode(action.pageId).pipe(
          map((_node: Node) => {
            return { templateId: action.templateId, pageId: action.pageId };
          }),
          // eslint-disable-next-line no-console
          // tap((value) => console.log('valami' + value)),
          map(({ templateId, pageId }) => AuTemplateActions.deleteAuTemplateSuccess({ templateId, pageId })),

          catchError((error) => of(AuTemplateActions.deleteAuTemplateFailure({ error })))
        );
      })
    );
  }); */
}
