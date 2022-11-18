import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import { MessageService } from 'primeng/api';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';

import { ApiInterceptor } from './interceptors/api.interceptor';
import { allBoardsReducer } from '../store/reducers/boards.reducer';
import { BoardsEffects } from '../store/effects/boards.effect';
import { ApiMainHelpersService } from '../pages/main/services/api-main-helpers.service';
import { currentBoardReducer } from '../store/reducers/details.reducer';
import { DetailsEffects } from '../store/effects/details.effects';
import { DetailsService } from '../pages/details/services/details.service';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { DetailsErrorHandlerService } from '../pages/details/services/details-error-handler.service';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { HeaderService } from './services/header.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({
      boards: allBoardsReducer,
      currentBoard: currentBoardReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([BoardsEffects, DetailsEffects]),
    SharedModule,
    RouterModule,
  ],
  providers: [
    ApiMainHelpersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    // MessageService,
    DetailsService,
    DetailsErrorHandlerService,
    HeaderService,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class CoreModule {}
