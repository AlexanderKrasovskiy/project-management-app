import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';

const PrimeComponents = [ButtonModule, ChipModule];

@NgModule({
  imports: [...PrimeComponents],
  exports: [...PrimeComponents],
})
export class UiPrimengModule {}
