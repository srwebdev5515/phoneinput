import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneInputComponent } from './phone-input/phone-input.component';
import { ThirdPartyModule } from '../third-party/third-party.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [PhoneInputComponent],
  imports: [
    CommonModule,
    ThirdPartyModule,
    CoreModule
  ],
  exports: [PhoneInputComponent]
})
export class ComponentsModule { }
