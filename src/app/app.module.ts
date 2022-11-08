import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { TranslocoRootModule } from './transloco-root.module';
import { WelcomeModule } from './pages/welcome/welcome.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { SpinnerModule } from './spinner/spinner.module';
// import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    TranslocoRootModule,
    WelcomeModule,
    HeaderModule,
    FooterModule,
    SpinnerModule,
    // SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
