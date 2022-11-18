import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { HeaderService } from 'src/app/core/services/header.service';
import { TaskModel } from '../../models/search.model';
import { FilterService } from '../../services/filter.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService],
})
export class SearchComponent implements OnInit, OnDestroy {
  private subscribe: Subscription = new Subscription();
  tasksSubj$ = new ReplaySubject<TaskModel[]>();

  constructor(
    public search: SearchService,
    public headerService: HeaderService,
    public filterService: FilterService,
  ) {}

  ngOnInit() {
    this.subscribe = this.search
      .getTasks()
      .subscribe((task) => this.tasksSubj$.next(task));
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
