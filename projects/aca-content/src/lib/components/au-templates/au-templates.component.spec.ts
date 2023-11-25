import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuTemplatesComponent } from './au-templates.component';

describe('AuTemplatesComponent', () => {
  let component: AuTemplatesComponent;
  let fixture: ComponentFixture<AuTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuTemplatesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AuTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
