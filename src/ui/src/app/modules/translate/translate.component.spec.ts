import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateComponent } from './translate.component';
import { HttpClientModule } from '@angular/common/http';


describe('TranslateComponent', () => {
  let component: TranslateComponent;
  let fixture: ComponentFixture<TranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslateComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
