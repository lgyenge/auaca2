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

import { Component, ViewChild, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@alfresco/adf-core';
// import { Store, select } from '@ngrx/store';
// import * as fromAuItems from '@alfresco/aca-shared/store';
// import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { getAuItemsAll, AuCategory, addAuCategory, deleteAuCategory, moveAuCategory } from '@alfresco/aca-shared/store';
// import { getAuItemsAll, AuItem } from '@alfresco/aca-shared/store';

// import { Observable, Subscription } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lib-au-item',
  standalone: true,
  imports: [CommonModule, MaterialModule, DragDropModule],
  templateUrl: './au-item.component.html',
  styleUrls: ['./au-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AuItemComponent {
  @Input() itemName: string;
  categoryNumber: number;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayMode = 'default';
  multi = false;
  hideToggle = true;
  disabled = false;
  showPanel3 = true;
  expandedHeight: string;
  collapsedHeight: string;

  getIndex(i: string | number) {
    this.categoryNumber = +i;
  }
  /*
  createCategory(categoryNumber: number) {
    const { pageId } = this;
    this.auStore.dispatch(addAuCategory({ pageId, categoryNumber }));
  }

  deleteCategory(categoryId: string) {
    const { pageId } = this;
    this.auStore.dispatch(deleteAuCategory({ pageId, categoryId }));
  }

  drop(event: CdkDragDrop<AuCategory[]>) {
    this.auStore.dispatch(
      moveAuCategory({ params: { node: this.auCategories[event.previousIndex], oldIndex: event.previousIndex, newIndex: event.currentIndex } })
    );
  } */
}
