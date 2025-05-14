import { Component, Input } from '@angular/core';
import { LoadingService } from '../../add-ins/service/loading.service';

@Component({
  selector: 'app-loading-overlay',

  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.scss'
})
export class LoadingOverlayComponent {
  isLoading = false; // 控制遮罩显示状态

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading; // 根据服务状态显示或隐藏
    });
  }
}
