import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LayoutService } from '../layout.service';
import { AppService } from '../../app.service';
import { AuthService } from '../../add-ins/service/auth.service';

@Component({
    selector: 'skydesk-ui-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})
export class MenuComponent {

    @Output() flagChanged = new EventEmitter<boolean>();

    model: any[] = [];
    user: any;
    logoUrl: any;

    constructor(public layoutService: LayoutService,
        private app: AppService,
        public authService: AuthService
    ) { }
    toggleSidenav() {
        this.layoutService.onMenuToggle()
        this.flagChanged.emit(true);
    
      }
    ngOnInit() {
        this.user = this.app.getCurrentUser();
        this.logoUrl = this.app.getLogo();
        this.model = [
            {
                label: '',
                items: [
                    { label: 'ホーム', icon: '', routerLink: ['/docs/s001'] }
                ]
            },
            {
                label: '業務アプリ',
                items: [
                    { label: '見積処理', icon: '', routerLink: ['/docs/s002'] },
                    { label: '請求処理', icon: '', routerLink: ['/docs/s006'] },

                ]
            },
            {
                label: '設定',
                items: [
                    { label: '基本設定', icon: '', routerLink: ['/docs/s011'] },
                    { label: '取引先管理', icon: '', routerLink: ['/docs/s010'] },
                    { label: 'ユーザ管理', icon: '', routerLink: ['/docs/s012'] },

                ]
            }
        ]
    }

    displayRole(role: string): string {
        switch (role) {
          case 'admin':
            return '統括管理者';
          case 'manager':
            return '実務管理者';
          case 'staff':
            return '担当者';
          default:
            return '';
        }
    }
  // 处理 OAuth 认证
  authenticate() {
    this.authService.getAuthUrl().subscribe(response => {
      window.open(response.auth_url, '_blank'); // 在新窗口打开 Google 授权页面
    });
  }
}


// this.model = [
//     {
//         label: 'Home',
//         items: [
//             { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
//         ]
//     },
//     {
//         label: 'UI Components',
//         items: [
//             { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
//             { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
//             { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
//             { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
//             { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
//             { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
//             { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
//             { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
//             { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
//             { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
//             { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
//             { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
//             { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
//             { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
//             { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
//             { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
//         ]
//     },
//     {
//         label: 'Prime Blocks',
//         items: [
//             { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
//             { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
//         ]
//     },
//     {
//         label: 'Utilities',
//         items: [
//             { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
//             { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
//         ]
//     },
//     {
//         label: 'Pages',
//         icon: 'pi pi-fw pi-briefcase',
//         items: [
//             {
//                 label: 'Landing',
//                 icon: 'pi pi-fw pi-globe',
//                 routerLink: ['/landing']
//             },
//             {
//                 label: 'Auth',
//                 icon: 'pi pi-fw pi-user',
//                 items: [
//                     {
//                         label: 'Login',
//                         icon: 'pi pi-fw pi-sign-in',
//                         routerLink: ['/auth/login']
//                     },
//                     {
//                         label: 'Error',
//                         icon: 'pi pi-fw pi-times-circle',
//                         routerLink: ['/auth/error']
//                     },
//                     {
//                         label: 'Access Denied',
//                         icon: 'pi pi-fw pi-lock',
//                         routerLink: ['/auth/access']
//                     }
//                 ]
//             },
//             {
//                 label: 'Crud',
//                 icon: 'pi pi-fw pi-pencil',
//                 routerLink: ['/pages/crud']
//             },
//             {
//                 label: 'Timeline',
//                 icon: 'pi pi-fw pi-calendar',
//                 routerLink: ['/pages/timeline']
//             },
//             {
//                 label: 'Not Found',
//                 icon: 'pi pi-fw pi-exclamation-circle',
//                 routerLink: ['/notfound']
//             },
//             {
//                 label: 'Empty',
//                 icon: 'pi pi-fw pi-circle-off',
//                 routerLink: ['/pages/empty']
//             },
//         ]
//     },
//     {
//         label: 'Hierarchy',
//         items: [
//             {
//                 label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
//                 items: [
//                     {
//                         label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
//                         items: [
//                             { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
//                             { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
//                             { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
//                         ]
//                     },
//                     {
//                         label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
//                         items: [
//                             { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
//                         ]
//                     },
//                 ]
//             },
//             {
//                 label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
//                 items: [
//                     {
//                         label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
//                         items: [
//                             { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
//                             { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
//                         ]
//                     },
//                     {
//                         label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
//                         items: [
//                             { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
//                         ]
//                     },
//                 ]
//             }
//         ]
//     },
//     {
//         label: 'Get Started',
//         items: [
//             {
//                 label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
//             },
//             {
//                 label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
//             }
//         ]
//     }
// ];