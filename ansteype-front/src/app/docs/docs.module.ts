import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsRoutingModule } from './docs-routing.module';
import { SearchComponent } from './search/search.component';
import { SearchAiComponent } from './search-ai/search-ai.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MessagesModule } from 'primeng/messages';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { DropdownModule } from 'primeng/dropdown';
import { S001Component } from './s001/s001.component';
import { S010Component } from './s010/s010.component';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { S008Component } from './s008/s008.component';
import { S011Component } from './s011/s011.component';
import { S012Component } from './s012/s012.component';
import { S020Component } from './s020/s020.component';
import { S002Component } from './s002/s002.component';
import { S003Component } from './s003/s003.component';
import { S005Component } from './s005/s005.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer'
import { DragDropModule } from 'primeng/dragdrop';
import { S013Component } from './s013/s013.component';
import { S022Component } from './s022/s022.component';
import { S006Component } from './s006/s006.component';
import { S007Component } from './s007/s007.component';
import { S023Component } from './s023/s023.component';
import { S014Component } from './s014/s014.component';
import { S021Component } from './s021/s021.component';
import { S004Component } from './s004/s004.component';
import { S024Component } from './s024/s024.component';
import { S025Component } from './s025/s025.component';
import { S017Component } from './s017/s017.component';
import { S018Component } from './s018/s018.component';
import { S019Component } from './s019/s019.component';
import { TabViewModule } from 'primeng/tabview';
import { S026Component } from './s026/s026.component';
import { P014Component } from './p014/p014.component';
import { P011Component } from './p011/p011.component';
import { S009Component } from './s009/s009.component';
import { P024Component } from './p024/p024.component';
import { ErrorMessagesComponent } from '../shared/components/error-messages/error-messages.component';
import { FormControlLabelDirective } from '../shared/directives/form-control-label.directive';
import { P003Component } from './p003/p003.component';
import { FileUploadModule } from 'primeng/fileupload';
import { P020Component } from './p020/p020.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { P005Component } from './p005/p005.component';
import { S027Component } from './s027/s027.component';


@NgModule({
  declarations: [
    SearchComponent,
    SearchAiComponent,
    ErrorMessagesComponent,
    FormControlLabelDirective,
    S001Component,
    S002Component,
    S003Component,
    S004Component,
    S005Component,
    S006Component,
    S007Component,
    S008Component,
    S009Component,
    S010Component,
    S011Component,
    S012Component,
    S013Component,
    S014Component,
    S017Component,
    S018Component,
    S019Component,
    S020Component,
    S020Component,
    S021Component,
    S022Component,
    S023Component,
    S024Component,
    S025Component,
    S026Component,
    P011Component,
    P014Component,
    P024Component,
    P003Component,
    P020Component,
    P005Component,
    S027Component,
  ],
  imports: [

    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DocsRoutingModule,
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
    MessagesModule,
    NgxDocViewerModule,
    DropdownModule,
    PanelModule,
    CalendarModule,
    NgxExtendedPdfViewerModule,
    DragDropModule,
    TabViewModule,
    FileUploadModule,
    ConfirmPopupModule
  ],
  providers: [ConfirmationService, MessageService, ErrorMessagesComponent, FormControlLabelDirective]
})
export class DocsModule { }
