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

import { Component, OnDestroy, ViewEncapsulation, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@alfresco/adf-core';
// import { AuCategoryComponent } from '../au-category/au-category.component';
// import { Store } from '@ngrx/store';
// import * as fromAuPages from '@alfresco/aca-shared/store';
// import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Node } from '@alfresco/js-api';
import // AuPage,
// AuCategory,
// addAuCategory,
// deleteAuCategory,
// moveAuCategory,
// getAuCategoriesOfPage,
// selectAuCategory,
// unSelectAuCategory,
// unSelectAuPage,
// unSelectAuItem,
// toggleAuCategorySelection
'@alfresco/aca-shared/store';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
// import { filter, takeUntil } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @alfresco/eslint-angular/use-none-component-view-encapsulation
  encapsulation: ViewEncapsulation.Emulated,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lib-au-page',
  standalone: true,
  // imports: [CommonModule, MaterialModule, AuCategoryComponent, DragDropModule],
  imports: [CommonModule, MaterialModule, DragDropModule],
  templateUrl: './au-page.component.html',
  styleUrls: ['./au-page.component.css']
})
export class AuPageComponent implements OnDestroy {
  onDestroy$: Subject<boolean> = new Subject<boolean>();
  @Input() page: Node;
  auCategories$: Observable<Node[]>;
  selectedAuCategory$: Observable<string | number>;
  categoryNumber: number;
  auCategories: Node[] = [];
  dataLoaded$: Observable<boolean> = of(false);
  subscription: Subscription;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayMode = 'default';
  multi = false;
  hideToggle = true;
  disabled = false;
  showPanel3 = true;
  expandedHeight: string;
  collapsedHeight: string;

  // constructor(private auStore: Store<fromAuPages.fromCategory.AuCategoryStore>) {}

  /* ngOnInit() {
    // this.selectedAuCategory$ = this.auStore.pipe(select(fromAuPages.getSelectedAuCategory));
    // this.dataLoaded$ = this.auStore.pipe(select(fromAuPages.getAuCategoryLoaded)).pipe(take(1));
    // this.auCategories$ = this.auStore.pipe(select(getAuCategoriesOfPage({ page: this.page }))).pipe(
      filter((res) => res != null),
      // eslint-disable-next-line no-console
      // tap((val) => console.log(`Get all Categories from Page ngOnInit:${this.page.id} - ${JSON.stringify(val)}`)),
      takeUntil(this.onDestroy$)
    );
  } */
  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  getIndex(i: string | number) {
    this.categoryNumber = +i;
  }

  /* createCategory(categoryNumber: number) {
    const { page } = this;
    // const pageId = page.id;
    this.auStore.dispatch(addAuCategory({ page, categoryNumber }));
  }

  deleteCategory(categoryId: string) {
    const { page } = this;
    // const pageId = page.id;
    this.auStore.dispatch(deleteAuCategory({ page, categoryId }));
  }

  drop(event: CdkDragDrop<Node[]>) {
    // eslint-disable-next-line no-console
    console.log(`category drop ${event.item.data.id}`);
    this.auStore.dispatch(
      moveAuCategory({ params: { page: this.page, node: event.item.data, oldIndex: event.previousIndex, newIndex: event.currentIndex } })
    );
  }

  public toggleCategorySelection(_event: any, page: Node) {
    this.auStore.dispatch(toggleAuCategorySelection({ id: page.id }));
 */
  // alert('Select ' + page.id);
  // }

  /*  public selectCategory(_event: any, category: AuCategory) {
    // this.auStore.dispatch(selectAuCategory({ id: category.id }));
    // this.auStore.dispatch(unSelectAuPage());
    // this.auStore.dispatch(unSelectAuItem());
    // alert('Select ' + page.id);
  } */

  /*  public unSelectCategory() {
    this.auStore.dispatch(unSelectAuCategory());

    // alert('Select ' + page.id);
  } */
}
