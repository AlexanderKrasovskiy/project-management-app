import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header/services/header.service';
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
  ) {}

  ngOnInit() {
    this.search.getTasks();
  }
}
