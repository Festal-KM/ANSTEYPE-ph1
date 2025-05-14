import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessListComponent } from './process-list/process-list.component';
import { ProcessManagerComponent } from './process-manager/process-manager.component';

const routes: Routes = [
  {path: '', redirectTo: 'process-list', pathMatch: 'full'},
  {path: 'process-list', component: ProcessListComponent},
  {path: 'process-manager', component: ProcessManagerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkydeskWorkflowRoutingModule { }
