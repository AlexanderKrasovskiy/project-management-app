import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TooltipModule } from 'primeng/tooltip';
import { UiPrimengModule } from './ui-primeng/ui-primeng.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiPrimengModule,
    TooltipModule,
  ],
  exports: [FormsModule, ReactiveFormsModule, UiPrimengModule, TooltipModule], // m.b. delete
})
export class SharedModule {}
