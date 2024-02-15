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

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@alfresco/adf-core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
// import { MatButtonModule } from '@angular/material/button';
// import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';

@Component({
  // eslint-disable-next-line @alfresco/eslint-angular/use-none-component-view-encapsulation
  encapsulation: ViewEncapsulation.Emulated,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lib-au-template-builder',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormlyModule, ReactiveFormsModule, FormlyMaterialModule],
  templateUrl: './au-template-builder.component.html',
  styleUrls: ['./au-template-builder.component.css']
})
export class AuTemplateBuilderComponent implements OnInit {
  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      props: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true
      }
    },
    {
      key: 'input',
      type: 'input',
      props: {
        label: 'Input',
        placeholder: 'Input placeholder',
        required: true
      }
    },
    {
      key: 'textarea',
      type: 'textarea',
      props: {
        label: 'Textarea',
        placeholder: 'Textarea placeholder',
        required: true
      }
    },
    {
      key: 'checkbox',
      type: 'checkbox',
      props: {
        label: 'Checkbox'
      }
    },
    {
      key: 'select',
      type: 'select',
      props: {
        label: 'Select',
        placeholder: 'Select placeholder',
        required: true,
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' }
        ]
      }
    },
    {
      key: 'radio',
      type: 'radio',
      props: {
        label: 'Radio',
        required: true,
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' }
        ]
      }
    }
  ];

  onSubmit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model, null, 2));
    }
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
