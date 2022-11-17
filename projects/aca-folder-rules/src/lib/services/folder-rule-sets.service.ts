/*!
 * @license
 * Alfresco Example Content Application
 *
 * Copyright (C) 2005 - 2020 Alfresco Software Limited
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail.  Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

import { Injectable } from '@angular/core';
import { AlfrescoApiService } from '@alfresco/adf-core';
import { BehaviorSubject, combineLatest, from, Observable, of } from 'rxjs';
import { NodeInfo } from '@alfresco/aca-shared/store';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { RuleSet } from '../model/rule-set.model';
import { ContentApiService } from '@alfresco/aca-shared';
import { NodeEntry } from '@alfresco/js-api';
import { FolderRulesService } from './folder-rules.service';
import { Rule } from '../model/rule.model';

@Injectable({
  providedIn: 'root'
})
export class FolderRuleSetsService {
  public static MAX_RULE_SETS_PER_GET = 100;

  private currentFolder: NodeInfo = null;
  private ruleSets: RuleSet[] = [];
  private hasMoreRuleSets = true;

  private ruleSetListingSource = new BehaviorSubject<RuleSet[]>([]);
  private hasMoreRuleSetsSource = new BehaviorSubject<boolean>(true);
  private folderInfoSource = new BehaviorSubject<NodeInfo>(null);
  private isLoadingSource = new BehaviorSubject<boolean>(false);

  ruleSetListing$: Observable<RuleSet[]> = this.ruleSetListingSource.asObservable();
  hasMoreRuleSets$: Observable<boolean> = this.hasMoreRuleSetsSource.asObservable();
  folderInfo$: Observable<NodeInfo> = this.folderInfoSource.asObservable();
  isLoading$ = this.isLoadingSource.asObservable();

  constructor(private apiService: AlfrescoApiService, private contentApi: ContentApiService, private folderRulesService: FolderRulesService) {}

  private callApi(path: string, httpMethod: string, body: object = {}): Promise<any> {
    // APIs used by this service are still private and not yet available for public use
    const params = [{}, {}, {}, {}, body, ['application/json'], ['application/json']];
    return this.apiService.getInstance().contentPrivateClient.callApi(path, httpMethod, ...params);
  }

  private getRuleSets(nodeId: string, skipCount = 0): Observable<RuleSet[]> {
    return from(
      this.callApi(
        `/nodes/${nodeId}/rule-sets?include=isLinkedTo,owningFolder,linkedToBy&skipCount=${skipCount}&maxItems=${FolderRuleSetsService.MAX_RULE_SETS_PER_GET}`,
        'GET'
      )
    ).pipe(
      tap((res) => {
        if (res?.list?.pagination) {
          this.hasMoreRuleSets = res.list.pagination.hasMoreItems;
        }
      }),
      switchMap((res) => this.formatRuleSets(res))
    );
  }

  loadRuleSets(nodeId: string) {
    this.isLoadingSource.next(true);
    this.ruleSets = [];
    this.hasMoreRuleSets = true;
    this.currentFolder = null;
    this.ruleSetListingSource.next(this.ruleSets);
    this.hasMoreRuleSetsSource.next(this.hasMoreRuleSets);
    this.getNodeInfo(nodeId)
      .pipe(
        tap((nodeInfo: NodeInfo) => {
          this.currentFolder = nodeInfo;
          this.folderInfoSource.next(this.currentFolder);
        }),
        switchMap(() => this.getRuleSets(nodeId)),
        finalize(() => this.isLoadingSource.next(false))
      )
      .subscribe((ruleSets: RuleSet[]) => {
        this.ruleSets = ruleSets;
        this.ruleSetListingSource.next(this.ruleSets);
        this.hasMoreRuleSetsSource.next(this.hasMoreRuleSets);
        this.folderRulesService.selectRule(this.getOwnedOrLinkedRuleSet()?.rules[0] ?? ruleSets[0]?.rules[0]);
      });
  }

  loadMoreRuleSets(selectLastRule = false) {
    this.isLoadingSource.next(true);
    this.getRuleSets(this.currentFolder.id, this.ruleSets.length)
      .pipe(finalize(() => this.isLoadingSource.next(false)))
      .subscribe((ruleSets) => {
        this.ruleSets.push(...ruleSets);
        this.ruleSetListingSource.next(this.ruleSets);
        this.hasMoreRuleSetsSource.next(this.hasMoreRuleSets);
        if (selectLastRule) {
          const ownedRuleSet = this.getOwnedOrLinkedRuleSet();
          this.folderRulesService.selectRule(ownedRuleSet?.rules[ownedRuleSet.rules.length - 1]);
        }
      });
  }

  private getNodeInfo(nodeId: string): Observable<NodeInfo> {
    if (nodeId) {
      return this.contentApi.getNode(nodeId).pipe(
        catchError((error) => {
          if (error.status === 404) {
            return of({ entry: null });
          }
          return of(error);
        }),
        map((entry: NodeEntry) => entry.entry)
      );
    } else {
      return of(null);
    }
  }

  private formatRuleSets(res: any): Observable<RuleSet[]> {
    return res?.list?.entries && res.list.entries instanceof Array
      ? combineLatest((res.list.entries as Array<any>).map((entry) => this.formatRuleSet(entry.entry)))
      : of([]);
  }

  private formatRuleSet(entry: any): Observable<RuleSet> {
    return combineLatest(
      this.currentFolder?.id === entry.owningFolder ? of(this.currentFolder) : this.getNodeInfo(entry.owningFolder || ''),
      this.folderRulesService.getRules(entry.owningFolder || '', entry.id)
    ).pipe(
      map(([owningFolderNodeInfo, getRulesRes]) => ({
        id: entry.id,
        isLinkedTo: entry.isLinkedTo || false,
        owningFolder: owningFolderNodeInfo,
        linkedToBy: entry.linkedToBy || [],
        rules: getRulesRes.rules,
        hasMoreRules: getRulesRes.hasMoreRules,
        loadingRules: false
      }))
    );
  }

  getRuleSetFromRuleId(ruleId: string): RuleSet {
    return this.ruleSets.find((ruleSet: RuleSet) => ruleSet.rules.findIndex((r: Rule) => r.id === ruleId) > -1) ?? null;
  }

  getOwnedOrLinkedRuleSet(): RuleSet {
    return (
      this.ruleSets.find(
        (ruleSet: RuleSet) => ruleSet.owningFolder.id === this.currentFolder.id || ruleSet.linkedToBy.indexOf(this.currentFolder.id) > -1
      ) ?? null
    );
  }
}