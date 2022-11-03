import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { UiPrimengModule } from './ui-primeng/ui-primeng.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, UiPrimengModule, FormsModule],
  exports: [UiPrimengModule, FormsModule], // m.b. delete
})
export class SharedModule {}
