import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { ApiMainService } from './services/api-main.service';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../../shared/shared.module';
import { MainModalComponent } from './components/main-modal/main-modal.component';

@NgModule({
  declarations: [MainComponent, MainPageComponent, MainModalComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
  providers: [ApiMainService],
})
export class MainModule {}
