import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '../../add-ins/service/loading.service';
import { S017Service } from './services/s017service';
import { TemporarySaveInfoDto } from './models/s017Dto';

@Component({
  selector: 'app-s017',
  templateUrl: './s017.component.html',
  styleUrl: './s017.component.scss'
})
export class S017Component {
  // Sample data for the table
  savedItems: TemporarySaveInfoDto[] = [];

  constructor(private router: Router,
        private fb: FormBuilder,
        private loadingService: LoadingService,
        private s017Service: S017Service
  ) {


   }
  
  ngOnInit(): void {

      this.s017Service.init().subscribe({
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
    if (item.temporary_save_type == 's003') {
      this.router.navigateByUrl('/docs/s003', {
        state: {
          mode: 'edit',
          temporarySaveInfoDto: item, // 传递数据集合
        },
      });
    } else if(item.temporary_save_type == 's022') {

      this.router.navigateByUrl('/docs/s022', {
        state: {
          mode: 'edit',
          temporarySaveInfoDto: item, // 传递数据集合
        },
      });
    }

  }

  // Handle "Delete" button click
  onDelete(item: TemporarySaveInfoDto) {
    this.s017Service.delete(item).subscribe({
      next: (response) => {
        // 处理 Base64 PDF 数据
       this.ngOnInit();
        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
        console.error('Failed to add business partner:', error);
      },
    });
  }

  goBack() {
    this.router.navigate(['/docs/s002']);
  }
}
