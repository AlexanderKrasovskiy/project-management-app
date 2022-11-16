import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

@NgModule({
  declarations: [SearchComponent, SearchPageComponent],
  imports: [CommonModule, SearchRoutingModule],
})
export class SearchModule {}
