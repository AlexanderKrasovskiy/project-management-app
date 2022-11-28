import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { SearchPageComponent } from './container/search-page.component';
import { FilterService } from './services/filter.service';

@NgModule({
  declarations: [SearchComponent, SearchPageComponent],
  imports: [CommonModule, SearchRoutingModule, SharedModule],
  providers: [FilterService],
})
export class SearchModule {}
