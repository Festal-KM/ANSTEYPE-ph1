import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { S010Service } from './services/s010service';
import { S010Dto } from './models/s010Dto';
import { LoadingService } from '../../add-ins/service/loading.service';

@Component({
  selector: 'app-s010',
  templateUrl: './s010.component.html',
  styleUrl: './s010.component.scss'
})
export class S010Component implements OnInit {
  data: S010Dto[] = [];

  constructor(private router: Router,
    private loadingService: LoadingService,
    private s010Service: S010Service) { }

  ngOnInit(): void {
    this.get_init_data()
  }

  get_init_data() {
    this.loadingService.show();
    this.s010Service.getCompanyData().subscribe({
      next: (response) => {
        this.data = response?.data as S010Dto[];
        this.loadingService.hide();
      },
      error: (error) => {
        this.loadingService.hide();
      },
    });
  }

  new() {
    this.router.navigate(['/docs/s014'], {
      state: {
        mode: 'new',
        id: null
      },
    });
  }

  edit(id: number) {
    if (id !== undefined) {
      this.router.navigate(['/docs/s014'], {
        state: {
          mode: 'edit',
          id: id
        },
      });
    } else {
      console.error('ID is undefined');
    };
  }

}
