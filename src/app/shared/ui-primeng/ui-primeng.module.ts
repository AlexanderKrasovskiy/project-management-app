import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ScrollTopModule } from 'primeng/scrolltop';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import { ProgressBarModule } from 'primeng/progressbar';

const PrimeComponents = [
  ButtonModule,
  ChipModule,
  SelectButtonModule,
  ScrollTopModule,
  DividerModule,
  PasswordModule,
  InputTextModule,
  TooltipModule,
  SidebarModule,
  ToastModule,
  RippleModule,
  ProgressSpinnerModule,
];

@NgModule({
  imports: [...PrimeComponents],
  exports: [...PrimeComponents],
})
export class UiPrimengModule {}
