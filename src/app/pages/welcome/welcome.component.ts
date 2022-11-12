import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  ngOnInit() {
    if (localStorage.getItem('PlanTokenInfo') === 'expired') {
      localStorage.removeItem('PlanTokenInfo');
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Your token is expired! Please, login',
        life: 5000,
      });
    }
  }
}
