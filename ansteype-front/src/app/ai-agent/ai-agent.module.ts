import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcceptanceGuidelinesComponent } from './acceptance-guidelines/acceptance-guidelines.component';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { AiAgentRoutingModule } from './ai-agent-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ListboxModule } from 'primeng/listbox';
import { MedicalSelectorComponent } from './acceptance-guidelines/medical-selector';
import { SplitterModule } from 'primeng/splitter';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { MessageService } from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    AcceptanceGuidelinesComponent,
    MedicalSelectorComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AiAgentRoutingModule,
    FieldsetModule,
    DividerModule,
    ButtonModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    ToastModule,
    DialogModule,
    CheckboxModule,
    InputTextModule,
    TableModule,
    RadioButtonModule,
    InputNumberModule,
    ListboxModule,
    SplitterModule,
    TreeModule,
    TreeSelectModule,
    TreeTableModule,
    BlockUIModule,
    MessagesModule
  ],
  providers: [MessageService]
})
export class AiAgentModule { }
