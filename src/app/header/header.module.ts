import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, CoreModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
