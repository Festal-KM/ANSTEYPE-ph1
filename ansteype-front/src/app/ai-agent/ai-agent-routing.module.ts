import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptanceGuidelinesComponent } from './acceptance-guidelines/acceptance-guidelines.component';


const routes: Routes = [
  { path: '', redirectTo: 'acceptance-guidelines', pathMatch: 'full' },
  { path: 'acceptance-guidelines', component: AcceptanceGuidelinesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AiAgentRoutingModule { }
