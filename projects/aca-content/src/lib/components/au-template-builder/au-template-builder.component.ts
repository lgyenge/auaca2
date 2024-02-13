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
import grapesjs from 'grapesjs';
// import 'grapesjs-preset-webpage';
import presetWebpage from 'grapesjs-preset-webpage';
import pluginForms from 'grapesjs-plugin-forms';
import blocksBasic from 'grapesjs-blocks-basic';
import blocksFlexbox from 'grapesjs-blocks-flexbox';
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
  ngOnInit(): void {
    this.editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: '#gjs',
      fromElement: true,
      // Size of the editor
      height: '800px',
      width: 'auto',
      panels: { defaults: [] },
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      plugins: [
        presetWebpage,
        blocksBasic,
        pluginForms,
        // pluginExport,
        blocksFlexbox
      ],
      // Disable the storage manager for the moment
      /* storageManager: {
        type: 'local', // Type of the storage, available: 'local' | 'remote'
        autosave: true, // Store data automatically
        autoload: true, // Autoload stored data on init
        stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
        options: {
          local: {
            // Options for the `local` type
            key: 'gjsProject' // The key for the local storage
          }
        }
      } */
      storageManager: false
      // We define a default panel as a sidebar to contain layers
    });

    this.editor.onReady(() => {
      // eslint-disable-next-line no-console
      console.log(`editor ready`);

      const cmp = this.editor.Components;

      // Change background of the wrapper and set some attribute
      const wrapper = cmp.getWrapper();
      wrapper.set('style', { 'background-color': 'red' });
      wrapper.set('attributes', { title: 'Hello!' });

      let wrapperChildren = cmp.getComponents();

      wrapperChildren = cmp.getComponents();
      // perform actions
      const comp1 = wrapperChildren.add([
        { style: { 'background-color': 'red' } },
        { style: { height: '200px', width: '100px' } },
        { style: { color: 'blue' } }
      ]);
      // Let's add some component
      // Now let's add an other one inside first component
      // First we have to get the collection inside. Each
      // component has 'components' property
      const comp1Children = comp1.get('components');
      // Procede as before. You could also add multiple objects
      comp1Children.add([{ style: { 'background-color': 'blue' } }, { style: { height: '200px', width: '100px' } }]);
    });

    // this.docObj= {html:this.editor.getHtml(), css:this.editor.getCss(), js:this.editor.getJs() }
  }

  /* ngAfterViewInit(): void {
  } */

  /*
  ngAfterViewInit(): void {
    // const wrapper = this.editor.DomComponents.getWrapper();
    this.editor.addComponents(`<div> <img src="https://path/image" /><span title="foo">Hello world!!!</span></div>`);

    let cmp = this.editor.Components;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // cmp = cmp * 2;

    this.editor.onReady(() => {
      const cmp = this.editor.Components;

      const wrapperChildren = cmp.getComponents();
      // perform actions
      wrapperChildren.add([{ style: { 'background-color': 'red' } }, { style: { height: '200px', width: '100px' } }]);
      // Let's add some component
      wrapperChildren.add({
        style: { 'background-color': 'blue' }
      });
      wrapperChildren.add({
        style: { 'background-color': 'red' }
      });
      // eslint-disable-next-line no-console
      console.log(`editor ready`);
    });

    // Change background of the wrapper and set some attribute
    const wrapper = cmp.getWrapper();
    wrapper.set('style', { 'background-color': 'red' });
    wrapper.set('attributes', { title: 'Hello!' });

    // Let's add some component
    const wrapperChildren = cmp.getComponents();
    const comp1 = wrapperChildren.add({
      style: { 'background-color': 'blue' }
    });
    wrapperChildren.add({
      style: { 'background-color': 'red' }
    });

    wrapperChildren.add({
      tagName: 'span',
      attributes: { title: 'Hello!' }
    });
    // Now let's add an other one inside first component
    // First we have to get the collection inside. Each
    // component has 'components' property
    const comp1Children = comp1.get('components');
    // Procede as before. You could also add multiple objects
    comp1Children.add([{ style: { 'background-color': 'red' } }, { style: { height: '200px', width: '100px' } }]);
  } */

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
