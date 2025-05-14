import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuComponent } from './menu/menu.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';
import { ConfigComponent } from './config/config.component';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SidebarModule } from 'primeng/sidebar';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { MenuItemComponent } from './menu/menu.item.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';
import { LoadingOverlayComponent  } from './loading-overlay/loading-overlay.component';


@NgModule({
  declarations: [
    TopbarComponent,
    SidebarComponent,
    MenuComponent,
    MenuItemComponent,
    LayoutComponent,
    FooterComponent,
    ConfigComponent,
    LoadingOverlayComponent,

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    RadioButtonModule,
    ButtonModule,
    InputSwitchModule,
    SidebarModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    DropdownModule,
    CalendarModule,
    RouterModule,
    TranslateModule,
    TooltipModule,
  ],
  exports: [
    LayoutComponent,
    TopbarComponent,
    SidebarComponent,
    MenuComponent,
    LayoutComponent,
    FooterComponent,
    ConfigComponent,
    
    LoadingOverlayComponent,
  ]
})
export class LayoutModule { }
