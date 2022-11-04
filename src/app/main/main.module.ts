import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'primeng/api';
import { MainRoutingModule } from './main-routing.module';
import { ApiMainHelpersService } from './services/api-main-helpers.service';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [MainComponent, MainPageComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
  providers: [ApiMainHelpersService],
})
export class MainModule {}
