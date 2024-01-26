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
/* eslint-disable @cspell/spellchecker */

import { Injectable } from '@angular/core';
import { SearchService, NodesApiService, SearchOptions } from '@alfresco/adf-content-services';
import { Observable, forkJoin, of } from 'rxjs';

import { Store } from '@ngrx/store';
// import * as fromAuPages from '../public-api';
import {
  // getAuCategoriesAll,
  // loadAuCategories,
  // selectCategoriesReady,
  // selectPagesReady,
  AppStore,
  SnackbarErrorAction,
  AuSelectionState
} from '../public-api';

import { catchError, concatMap, map, tap } from 'rxjs/operators';

// import { AuPage } from '../models/au-templates.model';
import { Node } from '@alfresco/js-api';

@Injectable({
  providedIn: 'root'
})
export class auTemplatesService {
  constructor(
    private nodesApi: NodesApiService,
    private searchService: SearchService,
    // private auPagesStore: Store<fromAuPages.fromPages.AuPagesStore>,
    private store: Store<AppStore>
  ) {}

  addTemplate(templatesId: string): Observable<{ template: Node; nodes: [Node, Node] }> {
    const name = 'Template';
    const nodeType = 'au:template';
    const opts = {
      ['autoRename']: true
    };
    const properties = { 'cm:description': 'Audit template' };
    const nameItem = 'Site conducted';

    return this.nodesApi.createFolder(templatesId, { name, properties, nodeType }, opts).pipe(
      // eslint-disable-next-line no-console
      tap((template) => console.log('addAuTemplate:' + template.id)),
      concatMap((template) => {
        return forkJoin([
          this.nodesApi.createFolder(
            template.id,
            {
              name: 'Title Page',
              properties: {
                'cm:description': 'The Title Page is the first page of your inspection report. You can customize the Title Page below'
              },
              nodeType: 'au:firstPage'
            },
            opts
          ),
          this.nodesApi.createFolder(
            template.id,
            {
              name: nameItem,
              properties: {
                'cm:description': 'Site conducted'
              },
              nodeType: 'au:itemQuestion'
            },
            opts
          )
        ]).pipe(
          map((nodes) => {
            return { template: template, nodes: nodes };
          })
        );
      }),
      concatMap((values) => {
        return forkJoin([
          this.nodesApi.updateNode(values.nodes[0].id, {
            properties: {
              'au:pageId': values.nodes[0].id,
              'au:nextItemId': values.nodes[1].id
            }
          }),
          this.nodesApi.updateNode(values.nodes[1].id, {
            properties: {
              'au:pageId': values.nodes[0].id,
              'au:nextItemId': ''
            }
          })
        ]).pipe(
          map((nodes) => {
            return { template: values.template, nodes: nodes };
          })
        );
      }),

      catchError((error) => this.handleError(error))
    );
  }

  getTemplateItems(nodeId: string) {
    /*  con st opts1 = {
      skipCount: 0,
      maxItems: 20,
      include: [`properties`],
      where: "(nodeType='au:folder')"
    }; */

    const opts1 = {
      skipCount: 0,
      maxItems: 200,
      include: [`properties`]
    };

    return this.nodesApi.getNodeChildren(nodeId, opts1);
  }

  addTemplatePage(result: AuSelectionState) {
    // const { o rdLinName, properties, nodesApi, parentNode } = this;
    const name = 'Oldal';
    const nodeTypePage = 'au:page';
    const opts = {
      ['autoRename']: true
    };

    const nextId = result.nextItem ? result.nextItem.id : '';
    return this.nodesApi
      .createFolder(
        result.page.parentId,
        {
          name: name,
          properties: {
            'cm:description': 'You can customize the Page below',
            'au:nextItemId': nextId
          },
          nodeType: nodeTypePage
        },
        opts
      )
      .pipe(
        concatMap((newPage) => {
          return forkJoin([
            this.nodesApi.updateNode(result.lastItem.id, {
              properties: {
                'au:nextItemId': newPage.id
              }
            }),
            this.nodesApi.updateNode(newPage.id, {
              properties: {
                'au:pageId': newPage.id
              }
            })
          ]).pipe(
            map((nodes) => {
              return { modifiedItem: nodes[0], newItem: nodes[1] };
            })
          );
        }),
        catchError((error) => this.handleError(error))
      );
  }

  addTemplateItem(result: AuSelectionState) {
    // const { ordLinName, properties, nodesApi, parentNode } = this;
    const name = 'Question';
    const nodeType = 'au:itemQuestion';
    const opts = {
      ['autoRename']: true
    };

    const nextId = result.item.properties['au:nextItemId'];
    return this.nodesApi
      .createFolder(
        result.item.parentId,
        {
          name: name,
          properties: {
            'cm:description': 'You can customize audit question',
            'au:nextItemId': nextId,
            'au:pageId': result.item.properties['au:pageId'],
            'au:sectionId': result.item.properties['au:sectionId']
          },
          nodeType: nodeType
        },
        opts
      )
      .pipe(
        concatMap((newItem) => {
          return this.nodesApi
            .updateNode(result.item.id, {
              properties: {
                'au:nextItemId': newItem.id
              }
            })
            .pipe(
              map((modifiedItem) => {
                return { modifiedItem: modifiedItem, newItem: newItem };
              })
            );
        }),
        catchError((error) => this.handleError(error))
      );
  }

  addTemplateSection(result: AuSelectionState) {
    const name = 'Section';
    const nodeType = 'au:itemSection';
    const opts = {
      ['autoRename']: true
    };

    const nextId = result.item.properties['au:nextItemId'];
    return this.nodesApi
      .createFolder(
        result.item.parentId,
        {
          name: name,
          properties: {
            'cm:description': 'You can customize section',
            'au:nextItemId': nextId,
            'au:pageId': result.item.properties['au:pageId']
          },
          nodeType: nodeType
        },
        opts
      )
      .pipe(
        concatMap((newItem) => {
          return forkJoin([
            this.nodesApi.updateNode(result.item.id, {
              properties: {
                'au:nextItemId': newItem.id
              }
            }),
            this.nodesApi.updateNode(newItem.id, {
              properties: {
                'au:sectionId': newItem.id
              }
            })
          ]).pipe(
            map((nodes) => {
              return { modifiedItem: nodes[0], newItem: nodes[1] };
            })
          );
        }),
        catchError((error) => this.handleError(error))
      );
  }

  deleteItemGroup(selection: AuSelectionState) {
    const nodeObservables: Observable<Node>[] = [];
    const nextItemId = selection.nextItem ? selection.nextItem.id : null;
    nodeObservables.push(
      this.nodesApi.updateNode(selection.prevItem.id, {
        properties: {
          'au:nextItemId': nextItemId
        }
      })
    );
    selection.itemsInGroup.forEach((item) => {
      const obs = this.nodesApi.deleteNode(item.id);
      nodeObservables.push(obs);
    });
    // eslint-disable-next-line no-console
    // console.log(`Load Categories from server (forkJoin nodeObservables) ${nodeObservables}`);
    return forkJoin(nodeObservables);
  }
  deleteTemplateNode(nodeId: string) {
    // es lint-disable-next-line no-console
    // console.log('delete nodeId:' + nodeId);
    return this.nodesApi.deleteNode(nodeId);
  }

  getTemplateResponseSets(rootNodeId: string, term: string, skipCount: number) {
    const searchOptions: SearchOptions = {
      skipCount: skipCount,
      maxItems: 100,
      rootNodeId: rootNodeId,
      nodeType: 'cm:folder',
      include: [`properties`]
    };

    term = 'item';
    return this.searchService.getNodeQueryResults(term, searchOptions);
  }

  getGlobalResponseSets(rootNodeId: string, term: string, skipCount: number) {
    const searchOptions: SearchOptions = {
      skipCount: skipCount,
      maxItems: 100,
      rootNodeId: rootNodeId,
      nodeType: 'cm:folder',
      include: [`properties`]
    };
    term = 'item';
    return this.searchService.getNodeQueryResults(term, searchOptions);
  }

  private handleError(error: Error): Observable<null> {
    let statusCode: number;

    try {
      statusCode = JSON.parse(error.message).error.statusCode;
    } catch (e) {
      statusCode = null;
    }

    if (statusCode !== 409) {
      this.store.dispatch(new SnackbarErrorAction('APP.MESSAGES.ERRORS.GENERIC'));
    } else {
      this.store.dispatch(new SnackbarErrorAction('APP.MESSAGES.ERRORS.CONFLICT'));
    }

    return of(null);
  }
}
