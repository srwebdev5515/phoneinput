import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneInputComponent } from './phone-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountriesService } from 'src/app/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DropdownModule } from 'primeng/dropdown';

describe('PhoneInputComponent', () => {
  let component: PhoneInputComponent;
  let fixture: ComponentFixture<PhoneInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneInputComponent ],
      imports: [ FormsModule, HttpClientTestingModule, ReactiveFormsModule, DropdownModule ],
      providers: [ CountriesService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
