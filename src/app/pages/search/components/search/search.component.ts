import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';
import { FilterService } from '../../services/filter.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService],
})
export class SearchComponent implements OnInit {
  constructor(
    public search: SearchService,
    public headerService: HeaderService,
    public filterService: FilterService,
  ) {}

  ngOnInit() {
    this.search.getTasks();
  }
}
