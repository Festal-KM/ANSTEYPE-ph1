import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TemporarySaveInfoDto } from './models/s018Dto';
import { FormBuilder } from '@angular/forms';
import { LoadingService } from '../../add-ins/service/loading.service';
import { S018Service } from './services/s018service';

@Component({
  selector: 'app-s018',
  templateUrl: './s018.component.html',
  styleUrl: './s018.component.scss'
})
export class S018Component {
  savedItems: TemporarySaveInfoDto[] = [];

  constructor(private router: Router,
        private fb: FormBuilder,
        private loadingService: LoadingService,
        private s018Service: S018Service) {


        }
  ngOnInit(): void {

      this.s018Service.init().subscribe({
        next: (response) => {
          
          this.savedItems = response.data.all_list;
          // 处理 Base64 PDF 数据
         
          this.loadingService.hide();
        },
        error: (error) => {
          this.loadingService.hide();
          console.error('Failed to add business partner:', error);
        },
      });
    }
  // Handle "Resume" button click
  onResume(item: TemporarySaveInfoDto) {
    sessionStorage.setItem('temporarySaveInfoDto', JSON.stringify(item));
    if (item.temporary_save_type == 's007') {
      this.router.navigateByUrl('/docs/s007', {
        state: {
          mode: 'edit',
          temporarySaveInfoDto: item, // 传递数据集合
        },
      });
    } else if(item.temporary_save_type == 's023') {

      this.router.navigateByUrl('/docs/s023', {
        state: {
          mode: 'edit',
          temporarySaveInfoDto: item, // 传递数据集合
        },
      });
    }

  }

  // Handle "Delete" button click
  onDelete(item: any) {
    this.s018Service.delete(item).subscribe({
      next: (response) => {
        // 处理 Base64 PDF 数据
        this.ngOnInit();
        this.loadingService.hide();


      },
      error: (error) => {
        this.loadingService.hide();
        console.error('Failed to add business partner:', error);
      },
    });}

  goBack() {
    this.router.navigate(['/docs/s006']);
  }
}
