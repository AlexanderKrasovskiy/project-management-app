import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';
import { DetailsService } from 'src/app/details/services/details-api.service';
import { environment } from '../../environments/environment';

import { ApiInterceptor } from './interceptors/api.interceptor';
import { allBoardsReducer } from '../store/reducers/boards.reducer';
import { BoardsEffects } from '../store/effects/boards.effect';
import { ApiMainService } from '../main/services/api-main.service';
import { currentBoardReducer } from '../store/reducers/details.reducer';
import { DetailsEffects } from '../store/effects/details.effects';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { DetailsErrorHandlerService } from '../details/services/details-error-handler.service';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { HeaderService } from './services/header.service';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainErrorHandlerService } from '../main/services/main-error-handler.service';
import { CreateBoardService } from '../shared/services/create-board.service';

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
    ApiMainService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    MessageService,
    DetailsService,
    DetailsErrorHandlerService,
    MainErrorHandlerService,
    HeaderService,
    CreateBoardService,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    NotFoundComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    NotFoundComponent,
  ],
})
export class CoreModule {}
