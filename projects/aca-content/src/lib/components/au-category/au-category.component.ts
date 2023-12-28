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

import { Component, OnInit, OnDestroy, ViewEncapsulation, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@alfresco/adf-core';
import { AuItemComponent } from '../au-item/au-item.component';
import { Store, select } from '@ngrx/store';
import * as fromAuItems from '@alfresco/aca-shared/store';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
// import { getAuItemsAll, AuItem, addAuItem, deleteAuItem, moveAuItem, loadAuItems } from '@alfresco/aca-shared/store';
import { getAuItemsOfCategories, AuCategory, AuItem, addAuItem, deleteAuItem, moveAuItem } from '@alfresco/aca-shared/store';
import { Observable, Subject, of } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
import { filter, take, takeUntil, tap } from 'rxjs/operators';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lib-au-category',
  standalone: true,
  imports: [CommonModule, MaterialModule, AuItemComponent, DragDropModule],
  templateUrl: './au-category.component.html',
  styleUrls: ['./au-category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AuCategoryComponent implements OnInit, OnDestroy {
  onDestroy$: Subject<boolean> = new Subject<boolean>();
  @Input() category: AuCategory;
  auItems$: Observable<AuItem[]>;
  itemNumber: number;
  auItems: AuItem[] = [];
  dataLoaded$: Observable<boolean> = of(false);
  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayMode = 'default';
  multi = false;
  hideToggle = true;
  disabled = false;
  showPanel3 = true;
  expandedHeight: string;
  collapsedHeight: string;

  constructor(private auStore: Store<fromAuItems.fromItem.AuItemStore>) {}

  ngOnInit() {
    this.dataLoaded$ = this.auStore.pipe(select(fromAuItems.getAuItemLoaded)).pipe(take(1));
    this.auItems$ = this.auStore.pipe(select(getAuItemsOfCategories({ category: this.category }))).pipe(
      filter((res) => res != null),
      // eslint-disable-next-line no-console
      tap((val) => console.log(`Get all Item from from Category ngOnInit ${this.category.id} -- ${JSON.stringify(val)}`)),
      takeUntil(this.onDestroy$)
    );
  }
  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  getIndex(i: string | number) {
    this.itemNumber = +i;
  }

  createItem(itemNumber: number) {
    const { category } = this;
    // const categoryId = category.id;

    this.auStore.dispatch(addAuItem({ category, itemNumber }));
  }

  deleteItem(itemId: string) {
    const { category } = this;
    // const categoryId = category.id;
    this.auStore.dispatch(deleteAuItem({ category, itemId }));
  }

  drop(event: CdkDragDrop<AuItem[]>) {
    this.auStore.dispatch(
      moveAuItem({ params: { category: this.category, node: event.item.data, oldIndex: event.previousIndex, newIndex: event.currentIndex } })
    );
  }
}
