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

import { Injectable } from '@angular/core';
import { SearchService, NodesApiService, SearchOptions } from '@alfresco/adf-content-services';

@Injectable({
  providedIn: 'root'
})
export class auTemplatesService {
  constructor(private nodesApi: NodesApiService, private searchService: SearchService) {}

  getTemplatePages(nodeId: string) {
    const opts = {
      skipCount: 0,
      maxItems: 20,
      include: [`properties`],
      where: "(nodeType='cm:folder')"
    };
    return this.nodesApi.getNodeChildren(nodeId, opts);
  }

  getTemplateCategories(rootNodeId: string, term: string, skipCount: number) {
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

  getTemplateItems(rootNodeId: string, term: string, skipCount: number) {
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
