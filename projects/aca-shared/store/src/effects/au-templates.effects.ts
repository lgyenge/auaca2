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
// import { of, forkJoin } from 'rxjs';
import { of } from 'rxjs';

import * as AuPageActions from '../actions/au-templates-actions';
import * as AuCategoryActions from '../actions/au-category.actions';
import * as AuItemActions from '../actions/au-item.actions';
import * as AuGlobalResponseSetActions from '../actions/au-global-response-set.actions';
import * as AuResponseSetActions from '../actions/au-response-set.actions';
// import { getAuPagesIds, AuPage, addAuPage } from '@alfresco/aca-shared/store';
import { getAuPagesIds } from '../selectors/au-templates.selectors';
import { AuPagesStore } from '../reducers/au-pages.reducer';
import { Node } from '@alfresco/js-api';

import { Store, select } from '@ngrx/store';

// import { NodesApiService } from '@alfresco/adf-content-services';
import { auTemplatesService } from '../services/au-templates.service'; // import ok
// import { auPagesService } from '@alfresco/aca-shared/store'; // @alfresco/aca-shared/store has a circular dependency on itself
// import { auPagesService } from '../public-api'; // import ok

// import { NodesApiService } from '@alfresco/adf-content-services';

@Injectable()
export class AuPagesEffects {
  // private nodesApi = inject(NodesApiService);
  private auTemplates = inject(auTemplatesService);
  private actions$ = inject(Actions);
  private auStore = inject(Store<AuPagesStore>);

  loadAuPages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuPageActions.loadAuPages),
      concatMap((action) =>
        this.auTemplates.getTemplatePages(action.templateId).pipe(
          // eslint-disable-next-line no-console
          // tap((value) => console.log('valami' + value)),
          map((data) => {
            const obj = { nodePaging: data[0], node: data[1] };
            return obj;
          }),
          map((data) => AuPageActions.loadAuPagesSuccess({ params: data })),
          catchError((error) => of(AuPageActions.loadAuPagesFailure({ error })))
        )
      )
    );
  });

  addAuPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuPageActions.addAuPage),
      concatMap((action) => {
        return this.auTemplates.addTemplatePage(action.templateId, action.pageNumber).pipe(
          map((node) => {
            return { node: node, pageNumber: action.pageNumber };
          }),
          // eslint-disable-next-line no-console
          tap((value) => console.log('valami' + value)),
          map((data) => AuPageActions.addAuPageSuccess({ params: data })),
          catchError((error) => of(AuPageActions.addAuPageFailure({ error })))
        );
      })
    );
  });

  deleteAuPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuPageActions.deleteAuPage),
      concatMap((action) => {
        return this.auTemplates.deleteTemplateNode(action.pageId).pipe(
          map((_node: Node) => {
            return { templateId: action.templateId, pageId: action.pageId };
          }),
          // eslint-disable-next-line no-console
          tap((value) => console.log('valami' + value)),
          map(({ templateId, pageId }) => AuPageActions.deleteAuPageSuccess({ templateId, pageId })),

          catchError((error) => of(AuPageActions.deleteAuPageFailure({ error })))
        );
      })
    );
  });

  moveAuPage$ = createEffect(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.actions$.pipe(
        ofType(AuPageActions.moveAuPage),
        concatMap((action) => {
          return this.auStore.pipe(select(getAuPagesIds)).pipe(
            // eslint-disable-next-line no-console
            // tap((response) => console.log('response:' + response)),
            map((iDs) => {
              return { action: action, iDs: iDs };
            })
          );
        }),
        map((res) => {
          return [res.action.params.node.parentId, res.iDs.join()];
        }),
        concatMap((result) => this.auTemplates.updateTemplateIds(result[0], result[1]))
      ),
    { dispatch: false }
  );

  saveAuPageIds$ = createEffect(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.actions$.pipe(
        ofType(AuPageActions.addAuPageSuccess),
        concatMap((action) => {
          return this.auStore.pipe(select(getAuPagesIds)).pipe(
            // eslint-disable-next-line no-console
            // tap((response) => console.log('response:' + response)),
            map((iDs) => {
              return { action: action, iDs: iDs };
            })
          );
        }),
        map((res) => {
          return [res.action.params.node.parentId, res.iDs.join()];
        }),
        concatMap((result) => this.auTemplates.updateTemplateIds(result[0], result[1]))
      ),
    { dispatch: false }
  );

  deleteAuPageIds$ = createEffect(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.actions$.pipe(
        ofType(AuPageActions.deleteAuPageSuccess),
        concatMap((action) => {
          return this.auStore.pipe(select(getAuPagesIds)).pipe(
            // eslint-disable-next-line no-console
            tap((response) => console.log('response:' + response)),
            map((iDs) => {
              return { action: action, iDs: iDs };
            })
          );
        }),
        map((res) => {
          return [res.action.templateId, res.iDs.join()];
        }),
        concatMap((result) => this.auTemplates.updateTemplateIds(result[0], result[1]))
      ),
    { dispatch: false }
  );

  constructor() {}
}

@Injectable()
export class AuCategoryEffects {
  // private nodesApi = inject(NodesApiService);
  private auTemplates = inject(auTemplatesService);
  private actions$ = inject(Actions);

  loadAuCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuCategoryActions.loadAuCategories),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        // this.auTemplates.getAuPages('91f74719-c33e-4814-a630-d78022a6cc04').pipe(
        this.auTemplates.getTemplateCategories(action.templateId, 'abc*', 0).pipe(
          // this.nodesApi.getNodeChildren(templateId.template).pipe(
          // eslint-disable-next-line no-console
          // tap(console.log('salami')),
          // eslint-disable-next-line no-console
          tap((value) => console.log('category effect:' + value)),
          map((nodePaging) => nodePaging.list.entries.map((x) => x.entry)),
          map((data) => AuCategoryActions.loadAuCategoriesSuccess({ AuCategories: data })),
          catchError((error) => of(AuCategoryActions.loadAuCategoriesFailure({ error })))
        )
      )
    );
  });

  constructor() {}
}

@Injectable()
export class AuItemEffects {
  // private nodesApi = inject(NodesApiService);
  private auTemplates = inject(auTemplatesService);
  private actions$ = inject(Actions);

  loadAuItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuItemActions.loadAuItems),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        // this.auTemplates.getAuPages('91f74719-c33e-4814-a630-d78022a6cc04').pipe(
        this.auTemplates.getTemplateItems(action.templateId, 'abc*', 0).pipe(
          // this.nodesApi.getNodeChildren(templateId.template).pipe(
          // eslint-disable-next-line no-console
          // tap(console.log('salami')),
          // eslint-disable-next-line no-console
          tap((value) => console.log('category effect:' + value)),
          map((nodePaging) => nodePaging.list.entries.map((x) => x.entry)),
          map((data) => AuItemActions.loadAuItemsSuccess({ AuItems: data })),
          catchError((error) => of(AuItemActions.loadAuItemsFailure({ error })))
        )
      )
    );
  });

  constructor() {}
}

@Injectable()
export class AuResponseSetEffects {
  // private nodesApi = inject(NodesApiService);
  private auTemplates = inject(auTemplatesService);
  private actions$ = inject(Actions);

  loadAuResponseSets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuResponseSetActions.loadAuResponseSets),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        // this.auTemplates.getAuPages('91f74719-c33e-4814-a630-d78022a6cc04').pipe(
        this.auTemplates.getTemplateResponseSets(action.templateId, 'abc*', 0).pipe(
          // this.nodesApi.getNodeChildren(templateId.template).pipe(
          // eslint-disable-next-line no-console
          // tap(console.log('salami')),
          // eslint-disable-next-line no-console
          tap((value) => console.log('category effect:' + value)),
          map((nodePaging) => nodePaging.list.entries.map((x) => x.entry)),
          map((data) => AuResponseSetActions.loadAuResponseSetsSuccess({ AuResponseSets: data })),
          catchError((error) => of(AuResponseSetActions.loadAuResponseSetsFailure({ error })))
        )
      )
    );
  });

  constructor() {}
}

@Injectable()
export class AuGlobalResponseSetEffects {
  // private nodesApi = inject(NodesApiService);
  private auTemplates = inject(auTemplatesService);
  private actions$ = inject(Actions);

  loadAuGlobalResponseSets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuGlobalResponseSetActions.loadAuGlobalResponseSets),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        // this.auTemplates.getAuPages('91f74719-c33e-4814-a630-d78022a6cc04').pipe(
        this.auTemplates.getGlobalResponseSets(action.templateId, 'abc*', 0).pipe(
          // this.nodesApi.getNodeChildren(templateId.template).pipe(
          // eslint-disable-next-line no-console
          // tap(console.log('salami')),
          // eslint-disable-next-line no-console
          tap((value) => console.log('category effect:' + value)),
          map((nodePaging) => nodePaging.list.entries.map((x) => x.entry)),
          map((data) => AuGlobalResponseSetActions.loadAuGlobalResponseSetsSuccess({ AuGlobalResponseSets: data })),
          catchError((error) => of(AuGlobalResponseSetActions.loadAuGlobalResponseSetsFailure({ error })))
        )
      )
    );
  });

  constructor() {}
}
