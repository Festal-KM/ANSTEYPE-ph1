import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', loadChildren: () => import('./login/skydesk-login.module').then(m => m.SkydeskLoginModule) },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],  // 🚀 确保未登录时跳转 login
        children: [
            { path: '', redirectTo: 'docs/s001', pathMatch: 'full' }, 
            {
                path: 'docs',
                loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'ai-agent',
                loadChildren: () => import('./ai-agent/ai-agent.module').then(m => m.AiAgentModule),
                canActivate: [AuthGuard]
            }, 
            {
                path: 'workflow',
                loadChildren: () => import('./workflow/skydesk-workflow.module').then(m => m.SkydeskWorkflowModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'error',
                loadChildren: () => import('./error/error.module').then(m => m.ErrorModule),
                canActivate: [AuthGuard]
            }
        ]
    },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
