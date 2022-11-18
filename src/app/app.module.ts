import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';

import { WelcomeModule } from './pages/welcome/welcome.module';
import { FooterModule } from './footer/footer.module';

import { SharedModule } from './shared/shared.module';
import { SpinnerModule } from './spinner/spinner.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    WelcomeModule,
    FooterModule,
    SharedModule,
    SpinnerModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
