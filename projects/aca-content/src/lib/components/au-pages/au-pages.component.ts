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

import { Component, OnInit, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@alfresco/adf-core';
import { AuPageComponent } from '../au-page/au-page.component';
import { Store, select } from '@ngrx/store';
import * as fromAuPages from '@alfresco/aca-shared/store';
// import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
// import { ScrollingModule } from '@angular/cdk/scrolling';

// import { AppStore, getAuPagesAll, AuPage } from '@alfresco/aca-shared/store';
import { getAuPagesAll, AuPage, addAuPage, deleteAuPage, moveAuPage } from '@alfresco/aca-shared/store';

import { Observable, Subscription } from 'rxjs';

@Component({
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lib-au-pages',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MaterialModule, AuPageComponent, DragDropModule],
  templateUrl: './au-pages.component.html',
  styleUrls: ['./au-pages.component.css']
})
export class AuPagesComponent implements OnInit {
  /*  protected store = inject<Store<AppStore>>(Store<AppStore>); */
  @Input() templateId: string;
  auPages$: Observable<AuPage[]>;
  pageNumber: number;
  auPages: AuPage[] = [];
  subscription: Subscription;

  constructor(private auStore: Store<fromAuPages.fromPages.AuPagesStore>) {}

  ngOnInit() {
    // this.auPages$ = this.store.pipe(select(getAuPagesAll));
    this.auPages$ = this.auStore.pipe(select(getAuPagesAll));
  }

  getIndex(i: string | number) {
    this.pageNumber = +i;
  }

  createPage(pageNumber: number) {
    // this.store.dispatch(new FlCreateClientSiteAction(this.parentNode.id)); addAuPage
    // parentId = 'abc';
    // const { templateId, pageNumber } = this;
    const { templateId } = this;

    this.auStore.dispatch(addAuPage({ templateId, pageNumber }));
  }

  deletePage(pageId: string) {
    const { templateId } = this;
    this.auStore.dispatch(deleteAuPage({ templateId, pageId }));
  }

  drop(event: CdkDragDrop<AuPage[]>) {
    // moveItemInArray(this.auPages, event.previousIndex, event.currentIndex);
    this.auStore.dispatch(
      moveAuPage({ params: { node: this.auPages[event.previousIndex], oldIndex: event.previousIndex, newIndex: event.currentIndex } })
    );
  }
}
