import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslocoRootModule } from 'src/app/transloco-root.module';

import { WelcomeComponent } from './welcome.component';

import { WelcomeRoutingModule } from './welcome-routing.module';
// import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule,
    // CoreModule,
    TranslocoRootModule,
  ],
})
export class WelcomeModule {}
