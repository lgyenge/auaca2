import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuItemComponent } from './au-item.component';

describe('AuItemComponent', () => {
  let component: AuItemComponent;
  let fixture: ComponentFixture<AuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
