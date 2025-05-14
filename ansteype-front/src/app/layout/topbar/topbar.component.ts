import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LayoutService } from '../layout.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'skydesk-ui-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  @Input('pageTitle') set data(pgTitle:string){
    this.pageTitle = pgTitle;
  }

  
    isSidenavOpen: boolean = false;
    items!: MenuItem[];
    pageTitle: string = '';
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { 
      
    }
    toggleSidenav(isSidenavOpen: any) {

      this.isSidenavOpen = isSidenavOpen
      this.layoutService.onMenuToggle()
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    window.location.href = '/login';
  }
}
