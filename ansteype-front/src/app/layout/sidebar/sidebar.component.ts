import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'skydesk-ui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Input('isSidenavOpen') set isSidenavData(isSidenav:boolean){
    this.isSidenavOpen = isSidenav;
  }
  @Output() flagChanged = new EventEmitter<boolean>();


  constructor(public layoutService: LayoutService, public el: ElementRef) { }
  isSidenavOpen: boolean = false;

  ngOnInit(): void {
    // // hide menu
    // this.layoutService.onMenuToggle();
  }
  toggleSidenav(isSidenavOpen: any) {
    this.flagChanged.emit(isSidenavOpen);

  }
}
