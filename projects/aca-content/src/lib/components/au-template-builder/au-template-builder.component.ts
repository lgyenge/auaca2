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

/* eslint-disable @cspell/spellchecker */
/* eslint-disable no-console */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@alfresco/adf-core';
import { AswFormBuilderModule } from '@asoftwareworld/form-builder/form-builder';
import { AswPreviewTemplateModule } from '@asoftwareworld/form-builder/preview-template';

@Component({
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lib-au-template-builder',
  standalone: true,
  imports: [CommonModule, MaterialModule, AswFormBuilderModule, AswPreviewTemplateModule],
  templateUrl: './au-template-builder.component.html',
  styleUrls: ['./au-template-builder.component.css']
})
export class AuTemplateBuilderComponent implements OnInit {
  title = 'ASW Form Builder Demo';
  jsonData: any[] = [];
  jsonData1: any[] = [];
  isShowPreviewButton = false;
  isShowJsonDataButton = true;
  isShowPublishButton = false;

  constructor() {}

  // Publish Template
  saveJsonData(data: any) {
    // ....
    console.log(data);
    // do something
  }

  // Preview Template
  previewTemplate(data: any) {
    this.jsonData = data;
  }

  buttonClick(data: any): void {
    console.log(data);
  }

  onSelectionChange(control: any): void {
    console.log(control);
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
