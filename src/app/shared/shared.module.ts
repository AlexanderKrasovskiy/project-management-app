import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiPrimengModule } from './ui-primeng/ui-primeng.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UiPrimengModule],
  exports: [FormsModule, ReactiveFormsModule, UiPrimengModule], // m.b. delete
})
export class SharedModule {}
