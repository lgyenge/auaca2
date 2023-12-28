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

import { Component, OnInit, OnDestroy, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@alfresco/adf-core';
import { Node } from '@alfresco/js-api';

import { AuPageComponent } from '../au-page/au-page.component';
import { DummyComponentComponent } from '../dummy-component/dummy-component.component';

import { Store, select } from '@ngrx/store';
import * as fromAuPages from '@alfresco/aca-shared/store';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import {
  getAuPagesOfPages,
  AuPage,
  addAuPage,
  deleteAuPage,
  moveAuPage,
  loadAuPages
  // clearAuPages,
  // clearAuCategories,
  // clearAuItems
} from '@alfresco/aca-shared/store';

import { Observable, Subject, of } from 'rxjs';
import { filter, take, takeUntil, tap } from 'rxjs/operators';

@Component({
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lib-au-pages',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MaterialModule, AuPageComponent, DragDropModule, DummyComponentComponent],
  templateUrl: './au-pages.component.html',
  styleUrls: ['./au-pages.component.css']
})
export class AuPagesComponent implements OnInit, OnDestroy {
  onDestroy$: Subject<boolean> = new Subject<boolean>();
  @Input() templateId: string;
  auPages$: Observable<AuPage[]>;
  pageNumber: number;
  auPages: AuPage[] = [];
  dataLoaded$: Observable<boolean> = of(false);
  template: Node;

  constructor(private auStore: Store<fromAuPages.fromPages.AuPagesStore>) {}

  ngOnInit() {
    // eslint-disable-next-line no-console
    console.log(`dispatch loadAuPages from Pages nginit`);
    this.auStore.dispatch(loadAuPages({ templateId: this.templateId }));
    // this.auStore.dispatch(loadAuPages({ templateId: '91f74719-c33e-4814-a630-d78022a6cc04' }));
    this.dataLoaded$ = this.auStore.pipe(select(fromAuPages.getAuPagesLoaded)).pipe(take(1));
    this.auPages$ = this.auStore.pipe(select(getAuPagesOfPages({ templateId: this.templateId }))).pipe(
      filter((res) => res != null),
      // eslint-disable-next-line no-console
      tap((val) => console.log(`Get all Page  from Pages ngOnInit ${val}`)),
      takeUntil(this.onDestroy$)
    );

    this.auStore
      .select(fromAuPages.selectTemplate)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((value) => {
        this.template = value;
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  getIndex(i: string | number) {
    this.pageNumber = +i;
  }

  createPage(pageNumber: number) {
    const { templateId } = this;

    this.auStore.dispatch(addAuPage({ templateId, pageNumber }));
  }

  deletePage(pageId: string) {
    const { templateId } = this;
    this.auStore.dispatch(deleteAuPage({ templateId, pageId }));
  }

  drop(event: CdkDragDrop<AuPage[]>) {
    this.auStore.dispatch(moveAuPage({ params: { node: event.item.data, oldIndex: event.previousIndex, newIndex: event.currentIndex } }));
  }
}
