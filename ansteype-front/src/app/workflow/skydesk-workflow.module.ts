import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkydeskWorkflowRoutingModule } from './skydesk-workflow-routing.module';
import { ProcessListComponent } from './process-list/process-list.component';
import { ProcessManagerComponent } from './process-manager/process-manager.component';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [
    ProcessListComponent,
    ProcessManagerComponent
  ],
  imports: [
    CommonModule,
    SkydeskWorkflowRoutingModule,
    FieldsetModule,
    DividerModule,
    InputTextareaModule
  ]
})
export class SkydeskWorkflowModule { }
