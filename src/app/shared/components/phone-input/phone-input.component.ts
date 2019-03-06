import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { CountriesService } from 'src/app/services';
import { Country, Observable, take, map, PhoneNumberValidation } from 'src/app/models';
import { parsePhoneNumber, PhoneNumber, AsYouType } from 'libphonenumber-js';

@Component({
  selector: 'app-phone-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true,
    }
  ],
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss']
})
export class PhoneInputComponent implements ControlValueAccessor, Validator {

  onChange: any;
  onTouched: any;
  disabled: boolean;
  countries: Observable<Country[]>;

  selectedCountry: Country;
  phoneNumber: string;

  constructor(
    private countriesService: CountriesService
  ) {
    this.countries = this.countriesService.getCountries().pipe(map(countries => {
      if (!this.selectedCountry) {
        this.selectedCountry = countries.find(c => c.code === 'US');
      }
      return countries;
    }));
  }

  writeValue(number: string): void {
    if (number) {
      try {
        const phone: PhoneNumber = parsePhoneNumber(number);
        this.countries.pipe(take(1)).subscribe(countries => {
          this.selectedCountry = countries.find(c => c.callingCode === phone.countryCallingCode);
          this.phoneNumber = phone.format('NATIONAL');
        });
      } catch {
        this.selectedCountry = null;
        this.phoneNumber = '';
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(c: AbstractControl): ValidationErrors {
    return this.invalid ? PhoneNumberValidation.error : PhoneNumberValidation.valid;
  }

  get invalid() {
    try {
      return !this.selectedCountry || !parsePhoneNumber(this.phoneNumber, this.selectedCountry.code as any).isValid();
    } catch {
      return true;
    }
  }

  onPhoneNumberChange(value: string) {
    this.phoneNumber = new AsYouType(this.selectedCountry.code as any).input(value);
    this.onChange(this.phoneNumber);
  }

  call(event: Event) {
    event.preventDefault();
  }

}
