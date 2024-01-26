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

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuSelectComponent } from '../au-select/au-select.component';
import { MaterialModule } from '@alfresco/adf-core';
import { Node } from '@alfresco/js-api';

// eslint-disable-next-line @alfresco/eslint-angular/use-none-component-view-encapsulation
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lib-au-section',
  standalone: true,
  imports: [CommonModule, MaterialModule, AuSelectComponent],
  templateUrl: './au-section.component.html',
  styleUrls: ['./au-section.component.css']
})
export class AuSectionComponent {
  @Input() item: Node;

  constructor() {}
}
