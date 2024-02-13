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

@Component({
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lib-au-template-builder',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './au-template-builder.component.html',
  styleUrls: ['./au-template-builder.component.css']
})
export class AuTemplateBuilderComponent implements OnInit {
  public editor: any = null;

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public closePage(_event: any) {
    // this.editor.addComponents(`<div> <img src="https://path/image" /><span title="foo">Hello world!!!</span></div>`);
    // Example of a new component with some extra property
    const cmp = this.editor.Components;
    cmp.addComponent({
      tagName: 'div',
      removable: true, // Can't remove it
      draggable: true, // Can't move it
      copyable: true, // Disable copy/past
      content: 'Content text', // Text inside component
      style: { color: 'blue' },
      attributes: { title: 'here' }
    });
    cmp.addComponent({
      type: 'input',
      traits: {
        options: [
          { name: 'opt1', value: 'abc' },
          { name: 'opt2', value: 'bce' }
        ]
      }
    });
    const comp1 = cmp.addComponent({
      type: 'select'
    });
    const traits = comp1.get('traits');
    // eslint-disable-next-line no-console
    traits.forEach((trait) => console.log(trait.props()));

    // eslint-disable-next-line no-console
    console.log(comp1.getTrait('options').props());
    // console.log(comp1.getTrait('name').props());
    comp1.getTrait('name').set({ label: 'valami', default: 'kaka' });

    // console.log(comp1.getTrait('options').props());

    /*  comp1.getTrait('options').set({
      changeProp: true,
      options: [
        { name: 'opt1', value: 'abc' },
        { name: 'opt2', value: 'bce' }
      ]
    });

    const categsTrait = comp1.get('traits').where({ name: 'options' })[0];
    console.log(categsTrait);
    categsTrait.set('options', [
      { value: 'val1', name: 'name12' },
      { value: 'val2', name: 'name13' }
    ]); */

    comp1.addAttributes({ 'data-key': 'value' });
  }
}
