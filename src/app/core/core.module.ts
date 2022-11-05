import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';

import { TranslocoRootModule } from '../transloco-root.module';

import { ApiInterceptor } from './interceptors/api.interceptor';
import { allBoardsReducer } from '../store/reducers/boards.reducer';
import { BoardsEffects } from '../store/effects/boards.effect';
import { ApiMainHelpersService } from '../main/services/api-main-helpers.service';
// import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({
      boards: allBoardsReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([BoardsEffects]),
    TranslocoRootModule,
    // SharedModule,
  ],
  exports: [],
  providers: [
    ApiMainHelpersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
