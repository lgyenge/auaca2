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
import { Observable, forkJoin } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as fromAuPages from '@alfresco/aca-shared/store';
import {
  // getAuCategoriesAll,
  // loadAuCategories,
  selectCategoriesReady,
  selectPagesReady
} from '@alfresco/aca-shared/store';
import { concatMap, filter, take, tap } from 'rxjs/operators';

import { AuPage } from '../models/au-templates.model';
import { NodePaging } from '@alfresco/js-api';

@Injectable({
  providedIn: 'root'
})
export class auTemplatesService {
  constructor(
    private nodesApi: NodesApiService,
    private searchService: SearchService,
    private auPagesStore: Store<fromAuPages.fromPages.AuPagesStore>
  ) {}

  /*  getTemplatePages(nodeId: string) {
    const opts = {
      skipCount: 0,
      maxItems: 20,
      include: [`properties`],
      where: "(nodeType='au:page')"
    };
    return this.nodesApi.getNodeChildren(nodeId, opts);
  } */

  getTemplatePages(nodeId: string) {
    const opts1 = {
      skipCount: 0,
      maxItems: 20,
      include: [`properties`],
      where: "(nodeType='au:page')"
    };

    const opts2 = {
      include: [`properties`],
      where: "(nodeType='cm:folder')"
    };
    return forkJoin([this.nodesApi.getNodeChildren(nodeId, opts1), this.nodesApi.getNode(nodeId, opts2)]);
  }

  addTemplatePage(parentId: string, pageId: number) {
    // const { ordLinName, properties, nodesApi, parentNode } = this;
    const name = 'Oldal';
    const nodeType = 'au:page';
    const opts = {
      ['autoRename']: true
    };
    const properties = { 'cm:description': 'ordLinDescription', 'au:pageId': pageId };
    return this.nodesApi.createFolder(parentId, { name, properties, nodeType }, opts);
  }

  // updateNode(nodeId: string, nodeBody: any, options?: any): Observable<Node>;
  updateTemplateIds(nodeId: string, iDs: string) {
    const properties = { 'au:pagesOrder': iDs };
    // eslint-disable-next-line no-console
    console.log('iDs:' + iDs);
    return this.nodesApi.updateNode(nodeId, { properties });
  }

  deleteTemplateNode(nodeId: string) {
    // eslint-disable-next-line no-console
    console.log('delete nodeId:' + nodeId);
    return this.nodesApi.deleteNode(nodeId);
  }

  getTemplateCategories() {
    const opts1 = {
      skipCount: 0,
      maxItems: 20,
      include: [`properties`],
      where: "(nodeType='au:itemCategory')"
    };
    const opts2 = {
      include: [`properties`],
      where: "(nodeType='au:page')"
    };

    return this.auPagesStore.pipe(select(selectPagesReady)).pipe(
      filter((res) => res.ready),
      // eslint-disable-next-line no-console
      // tap((val) => console.log(`selectPagesReady from getTemplateCategories service TAP: - ${JSON.stringify(val)}`)),
      take(1),
      concatMap((val) => {
        const pageObservables: Observable<NodePaging | AuPage>[] = [];
        val.pages.forEach((page) => {
          const ob1 = this.nodesApi.getNodeChildren(page.id, opts1);
          const ob2 = this.nodesApi.getNode(page.id, opts2);
          pageObservables.push(ob1);
          pageObservables.push(ob2);
        });
        // eslint-disable-next-line no-console
        console.log(`Load Categories from server (forkJoin Page Observables) ${pageObservables}`);
        return forkJoin(pageObservables);
      })
    );
  }

  addTemplateCategory(parentId: string) {
    // const { ordLinName, properties, nodesApi, parentNode } = this;
    const name = 'Category';
    const nodeType = 'au:itemCategory';
    const opts = {
      ['autoRename']: true
    };
    // const properties = { 'cm:description': 'ordLinDescription', 'au:categoryId': categoryId };
    const properties = { 'cm:description': 'ordLinDescription' };

    // eslint-disable-next-line no-console
    console.log('category parent id:' + parentId);
    return this.nodesApi.createFolder(parentId, { name, properties, nodeType }, opts);
  }

  getTemplateItems() {
    const opts1 = {
      skipCount: 0,
      maxItems: 20,
      include: [`properties`],
      where: "(nodeType='au:itemQuestion')"
    };
    // where: "(nodeType='au:itemQuestion')"

    const opts2 = {
      include: [`properties`],
      where: "(nodeType='au:itemCategory')"
    };

    return this.auPagesStore.pipe(select(selectCategoriesReady)).pipe(
      filter((res) => res.ready),
      take(1),
      // eslint-disable-next-line no-console
      tap((val) => console.log(`selectCategoriesReady from  from getTemplateItems service TAP: - ${JSON.stringify(val)}`)),
      concatMap((val) => {
        const categoryObservables: Observable<NodePaging | AuPage>[] = [];
        val.pages.forEach((category) => {
          const ob1 = this.nodesApi.getNodeChildren(category.id, opts1);
          const ob2 = this.nodesApi.getNode(category.id, opts2);
          categoryObservables.push(ob1);
          categoryObservables.push(ob2);
        });
        // eslint-disable-next-line no-console
        console.log(`Load Items from server (forkJoin Categories Observables) ${categoryObservables}`);
        return forkJoin(categoryObservables);
      })
    );
  }

  addTemplateItem(parentId: string) {
    // const { ordLinName, properties, nodesApi, parentNode } = this;
    const name = 'Item';
    const nodeType = 'au:itemQuestion';
    const opts = {
      ['autoRename']: true
    };
    // const properties = { 'cm:description': 'ordLinDescription', 'au:categoryId': categoryId };
    const properties = { 'cm:description': 'ordLinDescription' };

    // eslint-disable-next-line no-console
    console.log('category parent id:' + parentId);
    return this.nodesApi.createFolder(parentId, { name, properties, nodeType }, opts);
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
  /* getTemplateCategories(rootNodeId: string, term: string, skipCount: number) {
    const searchOptions: SearchOptions = {
      skipCount: skipCount,
      maxItems: 100,
      rootNodeId: rootNodeId,
      nodeType: 'cm:folder',
      include: [`properties`],
      orderBy: ['id'],
      fields: []
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    searchOptions;
    term = 'item';

    return this.searchService.getNodeQueryResults(term);
  }
 */
  /*
  getTemplateItems(nodeId: string) {
    const opts = {
      skipCount: 0,
      maxItems: 20,
      where: "(nodeType='cm:folder')"
    };
    return this.searchService.getNodeQueryResults(term: string, options?: SearchOptions);
  }

  getTemplateResponseSets(nodeId: string) {
    const opts = {
      skipCount: 0,
      maxItems: 20,
      where: "(nodeType='cm:folder')"
    };
    return this.searchService.getNodeQueryResults(term: string, options?: SearchOptions);
  }

  getTemplateMedia(nodeId: string) {
    const opts = {
      skipCount: 0,
      maxItems: 20,
      where: "(nodeType='cm:folder')"
    };
    return this.searchService.getNodeQueryResults(term: string, options?: SearchOptions);
  }
 */
}
