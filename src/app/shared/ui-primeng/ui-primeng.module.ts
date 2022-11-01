import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';

const PrimeComponents = [ButtonModule];

@NgModule({
  imports: [...PrimeComponents],
  exports: [...PrimeComponents],
})
export class UiPrimengModule {}
