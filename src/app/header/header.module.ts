import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderService } from './services/header.service';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [HeaderComponent],
  providers: [HeaderService],
})
export class HeaderModule {}
