import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root', // アプリ全体で利用可能にする
})
export class SnackbarService {
  constructor(private messageService: MessageService) {}

  /**
   * 成功メッセージを表示する
   * @param detail メッセージの詳細
   * @param summary メッセージの概要（デフォルト: '成功'）
   * @param duration 表示時間（ミリ秒、デフォルト: 3000）
   */
  success(detail: string, summary: string = '成功', duration: number = 3000): void {
    this.messageService.add({ severity: 'success', summary, detail, life: duration });
  }

  /**
   * エラーメッセージを表示する
   * @param detail メッセージの詳細
   * @param summary メッセージの概要（デフォルト: 'エラー'）
   * @param duration 表示時間（ミリ秒、デフォルト: 3000）
   */
  error(detail: string, summary: string = 'エラー', duration: number = 3000): void {
    this.messageService.add({ severity: 'error', summary, detail, life: duration });
  }

  /**
   * 警告メッセージを表示する
   * @param detail メッセージの詳細
   * @param summary メッセージの概要（デフォルト: '警告'）
   * @param duration 表示時間（ミリ秒、デフォルト: 3000）
   */
  warn(detail: string, summary: string = '警告', duration: number = 3000): void {
    this.messageService.add({ severity: 'warn', summary, detail, life: duration });
  }

  /**
   * 情報メッセージを表示する
   * @param detail メッセージの詳細
   * @param summary メッセージの概要（デフォルト: '情報'）
   * @param duration 表示時間（ミリ秒、デフォルト: 3000）
   */
  info(detail: string, summary: string = '情報', duration: number = 3000): void {
    this.messageService.add({ severity: 'info', summary, detail, life: duration });
  }
}
