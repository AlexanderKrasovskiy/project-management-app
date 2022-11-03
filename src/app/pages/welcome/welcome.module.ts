import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { SharedModule } from 'src/app/shared/shared.module';
// import { CoreModule } from 'src/app/core/core.module';
import { TranslocoRootModule } from 'src/app/transloco-root.module';

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
