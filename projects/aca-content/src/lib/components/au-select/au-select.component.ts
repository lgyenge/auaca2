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

import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@alfresco/adf-core';
import { Node } from '@alfresco/js-api';
import { Store, select } from '@ngrx/store';
import * as fromStorePublicApi from '@alfresco/aca-shared/store';
import { selectAuItem, unSelectAuItem, toggleAuItemSelection } from '@alfresco/aca-shared/store';
import { Observable } from 'rxjs';
// import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lib-au-select',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './au-select.component.html',
  styleUrls: ['./au-select.component.css'],
  // eslint-disable-next-line @alfresco/eslint-angular/use-none-component-view-encapsulation
  encapsulation: ViewEncapsulation.Emulated
})
export class AuSelectComponent implements OnInit {
  @Input() item: Node;
  selectedAuItem$: Observable<Node>;

  constructor(private auStore: Store<fromStorePublicApi.AuTemplsStore>) {}

  ngOnInit(): void {
    this.selectedAuItem$ = this.auStore.pipe(select(fromStorePublicApi.getSelectedAuItem));
  }

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
