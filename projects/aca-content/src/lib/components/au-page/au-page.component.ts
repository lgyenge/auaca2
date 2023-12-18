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

import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@alfresco/adf-core';
import { AuCategoryComponent } from '../au-category/au-category.component';
import { Store, select } from '@ngrx/store';

// import { Store } from '@ngrx/store';

import * as fromAuCategories from '@alfresco/aca-shared/store';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
// import { DragDropModule } from '@angular/cdk/drag-drop';
// import { getAuCategoriesAll, AuCategory, addAuCategory, deleteAuCategory, moveAuCategory, loadAuCategories } from '@alfresco/aca-shared/store';
import {
  AuPage,
  AuCategory,
  addAuCategory,
  deleteAuCategory,
  moveAuCategory,
  getAuCategoriesOfPage,
  // getAuCategoriesAll,
  loadAuCategories
} from '@alfresco/aca-shared/store';

// import { getAuCategoriesAll, AuCategory } from '@alfresco/aca-shared/store';

import { Observable, Subscription } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
import { filter, tap } from 'rxjs/operators';
// import { MatAccordion } from '@angular/material/expansion';

@Component({
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lib-au-page',
  standalone: true,
  imports: [CommonModule, MaterialModule, AuCategoryComponent, DragDropModule],
  templateUrl: './au-page.component.html',
  styleUrls: ['./au-page.component.css']
})
export class AuPageComponent implements OnInit {
  @Input() page: AuPage;
  // pageId = '9ecc7e49-9c0d-4418-bf2a-e3337dc4ba6e';
  auCategories$: Observable<AuCategory[]>;
  categoryNumber: number;
  auCategories: AuCategory[] = [];
  dataLoaded$: Observable<boolean>;
  subscription: Subscription;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayMode = 'default';
  multi = false;
  hideToggle = true;
  disabled = false;
  showPanel3 = true;
  expandedHeight: string;
  collapsedHeight: string;

  constructor(private auStore: Store<fromAuCategories.fromCategory.AuCategoryStore>) {}

  /*  ngOnInit() {
    this.dataLoaded$ = this.auStore.pipe(select(fromAuCategories.getAuCategoryLoaded));
    // eslint-disable-next-line no-console
    console.log(`dispatch loadAuCategories from au-page nginit`);
    this.auStore.dispatch(loadAuCategories({ pageId: this.page.id }));
    // this.auCategories$ = this.auStore.pipe(select(getAuCategoriesOfPage({ page: this.page }))).pipe(
    this.auCategories$ = this.auStore.pipe(select(getAuCategoriesAll)).pipe(
      // eslint-disable-next-line no-console
      tap((val) => console.log(`Get all Categories from Page:${this.page.id} - ${JSON.stringify(val)}`)),
      shareReplay(1)
    );
  } */

  ngOnInit() {
    /*  this.auStore.pipe(select(fromAuCategories.getAuCategoryLoaded)).subscribe((loaded) => {
      // eslint-disable-next-line no-console
      console.log(`Observable emitted the next value:   ${loaded} from Page:${this.page.id} `);
      if (loaded) {
        // this.auCategories$ = this.auStore.pipe(select(getAuCategoriesAll)).pipe(
        this.auCategories$ = this.auStore.pipe(select(getAuCategoriesOfPage({ page: this.page }))).pipe(
          // eslint-disable-next-line no-console
          tap((val) => console.log(`Get all Categories from Page:${this.page.id} - ${JSON.stringify(val)}`)),
          shareReplay(1)
        );
      }
    }); */
    // eslint-disable-next-line no-console
    console.log(`dispatch loadAuCategories from au-page nginit`);
    this.auStore.dispatch(loadAuCategories({ pageId: this.page.id }));
    this.auCategories$ = this.auStore.pipe(select(getAuCategoriesOfPage({ page: this.page }))).pipe(
      filter((res) => res != null),
      // filter((v) => v !== undefined),
      // eslint-disable-next-line no-console
      tap((val) => console.log(`Get all Categories from Page:${this.page.id} - ${JSON.stringify(val)}`))
    );
  }
  getIndex(i: string | number) {
    this.categoryNumber = +i;
  }

  createCategory(categoryNumber: number) {
    const { page } = this;
    const pageId = page.id;
    this.auStore.dispatch(addAuCategory({ pageId, categoryNumber }));
  }

  deleteCategory(categoryId: string) {
    const { page } = this;
    const pageId = page.id;
    this.auStore.dispatch(deleteAuCategory({ pageId, categoryId }));
  }

  drop(event: CdkDragDrop<AuCategory[]>) {
    // eslint-disable-next-line no-console
    console.log(`category drop $event.item.data.id`);
    this.auStore.dispatch(moveAuCategory({ params: { node: event.item.data, oldIndex: event.previousIndex, newIndex: event.currentIndex } }));
  }
}
