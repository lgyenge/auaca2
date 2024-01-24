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
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap, take } from 'rxjs/operators';
// import { Observable, EMPTY, of } from 'rxjs';
import * as AuTemplActions from '../actions/au-templ.actions';
import { Store, select } from '@ngrx/store';
// import { Node } from '@alfresco/js-api';
import { auTemplatesService } from '../services/au-templates.service'; // import ok
import { getCurrentFolder, AppStore, getAuSelection, AuSelectionState, NavigateRouteAction } from '../public-api';

import { of } from 'rxjs';

@Injectable()
export class AuTemplEffects {
  private auTemplates = inject(auTemplatesService);
  private actions$ = inject(Actions);
  // private auStore = inject(Store<AuTemplsStore>);
  private store = inject(Store<AppStore>);

  /* addAuTempl2$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuTemplActions.addAuTempl),
        map(() => {
          this.store
            .select(getCurrentFolder)
            .pipe(
              // eslint-disable-next-line no-console
              tap((folder: Node) => console.log('addAuTempl effect: ' + folder.id)),
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
  );
 */
  addAuTempl$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuTemplActions.addAuTempl),
        concatMap(() => {
          return this.store.select(getCurrentFolder).pipe(
            take(1),
            // eslint-disable-next-line no-console
            // tap((folder) => console.log('addAuTempl effect: ' + folder.id)),
            concatMap((folder) => this.auTemplates.addTemplate(folder.id)),
            map((data) => AuTemplActions.addAuTemplSuccess({ params: data })),
            tap((data) => this.store.dispatch(new NavigateRouteAction(['templates', data.params.template.id]))),
            catchError((error) => of(AuTemplActions.addAuTemplFailure({ error })))
          );
        })
      )
    // { dispatch: false }
  );

  /* deleteAuTempl$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuTemplActions.deleteAuTempl),
      concatMap((action) => {
        return this.auTemplates.deleteTemplateNode(action.pageId).pipe(
          map((_node: Node) => {
            return { templateId: action.templateId, pageId: action.pageId };
          }),
          // eslint-disable-next-line no-console
          // tap((value) => console.log('valami' + value)),
          map(({ templateId, pageId }) => AuTemplActions.deleteAuTemplSuccess({ templateId, pageId })),

          catchError((error) => of(AuTemplActions.deleteAuTemplFailure({ error })))
        );
      })
    );
  }); */

  loadAuItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuTemplActions.loadAuItems),
      concatMap((action) =>
        this.auTemplates.getTemplateItems(action.templateId).pipe(
          // eslint-disable-next-line no-console
          // tap((value) => console.log('loadAuItems effect (Items loaded from server):' + value)),
          /*  map((data) => {
            const obj = { nodePaging: data[0], node: data[1] };
            return obj;
          }), */
          map((data) => AuTemplActions.loadAuItemsSuccess({ items: data.list.entries })),
          // tap(() => this.auStore.dispatch(loadAuCategories())),
          catchError((error) => of(AuTemplActions.addAuTemplFailure({ error })))
        )
      )
    );
  });

  addAuPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuTemplActions.addAuPage),
      // eslint-disable-next-line no-console
      tap((value) => console.log('page added effect1:' + value)),
      concatMap(() => {
        return this.store.pipe(select(getAuSelection), take(1));
      }),
      // eslint-disable-next-line no-console
      tap((selection) => console.log('getAuSelection:' + selection.lastItem.id)),
      concatMap((selection: AuSelectionState) => {
        return this.auTemplates.addTemplatePage(selection).pipe(
          /* map((nodes) => {
            // return { prevItem: selection.prevItem, lastItem: nodes.lastNode, newItem: nodes.newPage };
            return { modifiedItem: nodes.modifiedItem, newItem: nodes.newItem };
          }), */
          // eslint-disable-next-line no-console
          // tap((result) => console.log(`selection ${JSON.stringify(result)}`)),
          tap(() => this.store.dispatch(AuTemplActions.unSelectAuItem())),
          map((result) => AuTemplActions.addAuItemSuccess({ params: result })),
          catchError((error) => of(AuTemplActions.addAuPageFailure({ error })))
        );
      })
    );
  });

  addAuItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuTemplActions.addAuItem),
      // eslint-disable-next-line no-console
      tap((value) => console.log('item added effect1:' + value)),
      concatMap(() => {
        return this.store.pipe(select(getAuSelection), take(1));
      }),
      // eslint-disable-next-line no-console
      tap((selection) => console.log('getAuSelection:' + selection.lastItem.id)),
      concatMap((selection: AuSelectionState) => {
        return this.auTemplates.addTemplateItem(selection).pipe(
          /*  map((nodes) => {
            // return { prevItem: selection.prevItem, lastItem: nodes.lastNode, newItem: nodes.newNode };
            return { modifiedItem: nodes.modifiedItem, newItem: nodes.newItem };
          }), */
          // eslint-disable-next-line no-console
          // tap((result) => console.log(`selection ${JSON.stringify(result)}`)),
          tap(() => this.store.dispatch(AuTemplActions.unSelectAuItem())),
          map((result) => AuTemplActions.addAuItemSuccess({ params: result })),
          catchError((error) => of(AuTemplActions.addAuItemFailure({ error })))
        );
      })
    );
  });

  addAuSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuTemplActions.addAuSection),
      // eslint-disable-next-line no-console
      tap((value) => console.log('page added effect1:' + value)),
      concatMap(() => {
        return this.store.pipe(select(getAuSelection), take(1));
      }),
      // eslint-disable-next-line no-console
      tap((selection) => console.log('getAuSelection:' + selection.lastItem.id)),
      concatMap((selection: AuSelectionState) => {
        return this.auTemplates.addTemplateSection(selection).pipe(
          /*  map((nodes) => {
            // return { prevItem: selection.prevItem, lastItem: nodes.lastNode, newItem: nodes.newPage };
            return { modifiedItem: nodes.modifiedItem, newItem: nodes.newItem };
          }), */
          // eslint-disable-next-line no-console
          // tap((result) => console.log(`selection ${JSON.stringify(result)}`)),
          tap(() => this.store.dispatch(AuTemplActions.unSelectAuItem())),
          map((result) => AuTemplActions.addAuItemSuccess({ params: result })),
          catchError((error) => of(AuTemplActions.addAuPageFailure({ error })))
        );
      })
    );
  });

  deleteAuItemGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuTemplActions.deleteAuItemGroup),
      // eslint-disable-next-line no-console
      tap((value) => console.log('delete item group effect1:' + value)),
      concatMap(() => {
        return this.store.pipe(select(getAuSelection), take(1));
      }),
      // eslint-disable-next-line no-console
      tap((selection) => console.log('getAuSelection:' + selection.lastItem.id)),
      concatMap((selection) => {
        return this.auTemplates.deleteItemGroup(selection).pipe(
          map((node) => {
            /// return { isEmpty: false, prevItem: nodes.prevNode, newItem: nodes.newPage };
            return { prevItem: node[0], itemsInGroup: selection.itemsInGroup };
          }),
          // eslint-disable-next-line no-console
          tap((result) => console.log('page deleted effect2:' + result)),
          tap(() => this.store.dispatch(AuTemplActions.unSelectAuItem())),
          map((result) => AuTemplActions.deleteAuItemGroupSuccess({ params: result })),
          catchError((error) => of(AuTemplActions.deleteAuItemGroupFailure({ error })))
        );
      })
    );
  });
}
