import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-au-templates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './au-templates.component.html',
  styleUrls: ['./au-templates.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuTemplatesComponent {}
