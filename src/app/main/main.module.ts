import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { MainRoutingModule } from './main-routing.module';
import { ApiMainHelpersService } from './services/api-main-helpers.service';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { MainService } from './services/main.service';

@NgModule({
  declarations: [MainComponent, MainPageComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule, TooltipModule],
  providers: [ApiMainHelpersService, MainService],
})
export class MainModule {}
