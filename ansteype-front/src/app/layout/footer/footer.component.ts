import { Component } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'skydesk-ui-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public layoutService: LayoutService) { }
}
