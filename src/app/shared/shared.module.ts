import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { ThirdPartyModule } from './third-party/third-party.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ComponentsModule,
    ThirdPartyModule,
    CoreModule
  ]
})
export class SharedModule { }
