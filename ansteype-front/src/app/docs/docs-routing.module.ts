import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SearchAiComponent } from './search-ai/search-ai.component';
import { S002Component } from './s002/s002.component';
import { S003Component } from './s003/s003.component';
import { S005Component } from './s005/s005.component';
import { S001Component } from './s001/s001.component';
import { S010Component } from './s010/s010.component';
import { S008Component } from './s008/s008.component';
import { S011Component } from './s011/s011.component';
import { S012Component } from './s012/s012.component';
import { S020Component } from './s020/s020.component';
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
import { S026Component } from './s026/s026.component';
import { S009Component } from './s009/s009.component';
import { S027Component } from './s027/s027.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'search-ai', component: SearchAiComponent },
  { path: 's001', component: S001Component },
  { path: 's002', component: S002Component },
  { path: 's003', component: S003Component },
  { path: 's004', component: S004Component },
  { path: 's005', component: S005Component },
  { path: 's006', component: S006Component },
  { path: 's007', component: S007Component },
  { path: 's008', component: S008Component },
  { path: 's009', component: S009Component },
  { path: 's010', component: S010Component },
  { path: 's011', component: S011Component },
  { path: 's012', component: S012Component },
  { path: 's013', component: S013Component },
  { path: 's014', component: S014Component },
  { path: 's017', component: S017Component },
  { path: 's018', component: S018Component },
  { path: 's019', component: S019Component },
  { path: 's020', component: S020Component },
  { path: 's021', component: S021Component },
  { path: 's022', component: S022Component },
  { path: 's023', component: S023Component },
  { path: 's024', component: S024Component },
  { path: 's025', component: S025Component },
  { path: 's026', component: S026Component },
  { path: 's027', component: S027Component },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule { }
