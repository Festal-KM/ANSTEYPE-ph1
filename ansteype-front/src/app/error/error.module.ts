import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ListboxModule } from 'primeng/listbox';
import { SplitterModule } from 'primeng/splitter';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { MessageService } from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import { MessagesModule } from 'primeng/messages';
import { ErrorPageComponent } from './error-page';

@NgModule({
  declarations: [
    ErrorPageComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
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
export class ErrorModule { }
