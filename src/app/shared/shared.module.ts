import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiPrimengModule } from './ui-primeng/ui-primeng.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, UiPrimengModule],
  exports: [UiPrimengModule], // m.b. delete
})
export class SharedModule {}
