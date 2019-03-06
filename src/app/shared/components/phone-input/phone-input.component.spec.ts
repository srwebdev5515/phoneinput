import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneInputComponent } from './phone-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountriesService } from 'src/app/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DropdownModule } from 'primeng/dropdown';
import { of } from 'rxjs';

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

    component.countries = of([
      { name: 'United States of America', code: 'US', callingCode: '1', flag: 'null' }
    ]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('write value shoule set selectedCountry and phone number', () => {
    component.writeValue('+14244444444');
    expect(component.selectedCountry.code).toEqual('US');
  });

  it('validate with incorrect number should work', () => {
    component.writeValue('+1424354');
    expect(component.invalid).toEqual(true);
    expect(component.validate(null)).not.toEqual(null);
  });

  it('validate with correct number should work', () => {
    component.writeValue('+14244444444');
    expect(component.invalid).toEqual(false);
    expect(component.validate(null)).toEqual(null);
  });

});
