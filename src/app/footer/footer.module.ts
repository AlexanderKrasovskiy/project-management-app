import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [FooterComponent],
})
export class FooterModule {}
