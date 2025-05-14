import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'skydesk-app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'skydesk-app';
  constructor() {

  }
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event) {
    console.log('Page is refreshing, clearing token...');
    localStorage.removeItem('ansteype_token'); // 🚀 刷新时清除 token
  }
}
