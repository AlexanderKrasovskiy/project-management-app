import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, Subscription, tap } from 'rxjs';
import { HeaderService } from 'src/app/core/services/header.service';
import { SortKeyWord, TaskModel } from '../../models/search.model';
import { FilterService } from '../../services/filter.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService],
})
export class SearchComponent implements OnInit, OnDestroy {
  tasksSubj$ = new ReplaySubject<TaskModel[]>();
  sort = SortKeyWord;
  private subscribe: Subscription = new Subscription();

  constructor(
    public search: SearchService,
    public headerService: HeaderService,
    public filterService: FilterService,
  ) {}

  ngOnInit(): void {
    this.subscribe = this.search
      .getTasks()
      .pipe(tap((task) => this.tasksSubj$.next(task)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
