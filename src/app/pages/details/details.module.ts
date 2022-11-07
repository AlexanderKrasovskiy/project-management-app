import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/app/shared/shared.module';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsPageComponent } from './pages/details-page.component';

@NgModule({
  declarations: [DetailsPageComponent],
  imports: [CommonModule, DetailsRoutingModule, DragDropModule, SharedModule],
})
export class DetailsModule {}
