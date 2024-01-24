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
import { Store, select } from '@ngrx/store';
import * as fromStorePublicApi from '@alfresco/aca-shared/store';
// import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  getAuTemplsAll,
  getAuSelection,
  AuSelectionState,
  // AuPage,
  addAuPage,
  deleteAuItemGroup,
  // moveAuItem,
  loadAuItems,
  selectAuItem,
  unSelectAuItem,
  toggleAuItemSelection,
  SetSelectedNodesAction
} from '@alfresco/aca-shared/store';
import { AppExtensionService } from '@alfresco/aca-shared';

import { Observable, Subject, of } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  // eslint-disable-next-line @alfresco/eslint-angular/use-none-component-view-encapsulation
  encapsulation: ViewEncapsulation.Emulated,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lib-au-pages',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // imports: [CommonModule, MaterialModule, AuPageComponent, DragDropModule, DummyComponentComponent],
  imports: [CommonModule, MaterialModule, DragDropModule],
  templateUrl: './au-pages.component.html',
  styleUrls: ['./au-pages.component.css']
})
export class AuPagesComponent implements OnInit, OnDestroy {
  onDestroy$: Subject<boolean> = new Subject<boolean>();
  @Input() templateId: string;
  auItems$: Observable<Node[]>;
  selectedAuItem$: Observable<Node>;
  selectedItem: Node;
  auSelection: AuSelectionState;
  pageNumber: number;
  auItems: Node[] = [];
  dataLoaded$: Observable<boolean> = of(false);
  template: Node;
  panelOpenState = false;

  constructor(private auStore: Store<fromStorePublicApi.AuTemplsStore>, private extensions: AppExtensionService, private store: Store) {}
  // protected extensions = inject(AppExtensionService);

  ngOnInit() {
    // eslint-disable-next-line no-console
    // console.log(`dispatch loadAuPages from Pages nginit`);
    this.selectedAuItem$ = this.auStore.pipe(select(fromStorePublicApi.getSelectedAuItem));
    this.auStore.dispatch(loadAuItems({ templateId: this.templateId }));
    this.dataLoaded$ = this.auStore.pipe(select(fromStorePublicApi.getAuTemplsLoaded)).pipe(take(1));
    this.auItems$ = this.auStore.pipe(select(getAuTemplsAll)).pipe(
      // filter((res) => res != null),
      // eslint-disable-next-line no-console
      // tap((val) => console.log(`Get all Item  from Items ngOnInit ${val}`)),
      takeUntil(this.onDestroy$)
    );

    this.auStore
      .select(fromStorePublicApi.selectTemplate)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((value) => {
        this.template = value;
      });
    this.auStore
      .select(getAuSelection)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        this.auSelection = result;
        this.extensions.auSelection = result;
        // eslint-disable-next-line no-console
        // console.log(`auSelection ${JSON.stringify(result)}`);
        // to init change
        this.store.dispatch(new SetSelectedNodesAction([]));
      });
  }

  ngOnDestroy() {
    this.auStore.dispatch(unSelectAuItem());
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  getIndex(i: string | number) {
    this.pageNumber = +i;
  }

  createPage() {
    // const { templateId } = this;

    this.auStore.dispatch(addAuPage());
  }

  deleteItem() {
    this.auStore.dispatch(deleteAuItemGroup());
  }

  /*  drop(event: CdkDragDrop<Node[]>) {
    this.auStore.dispatch(moveAuItem({ params: { node: event.item.data, oldIndex: event.previousIndex, newIndex: event.currentIndex } }));
  } */

  public toggleItemSelection(_event: any, item: Node) {
    this.auStore.dispatch(toggleAuItemSelection({ item: item }));
  }

  public selectItem(_event: any, item: Node) {
    this.auStore.dispatch(selectAuItem({ item: item }));
    // this.auStore.dispatch(unSelectAuCategory());
    // this.auStore.dispatch(unSelectAuItem());
  }

  public unSelectItem() {
    this.auStore.dispatch(unSelectAuItem());
  }
}
