import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MainRoutingModule } from './main-routing.module';
import { ApiMainHelpersService } from './services/api-main-helpers.service';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { MainModalComponent } from './components/main-modal/main-modal.component';

@NgModule({
  declarations: [MainComponent, MainPageComponent, MainModalComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    TooltipModule,
    MatDialogModule,
  ],
  providers: [ApiMainHelpersService],
})
export class MainModule {}
