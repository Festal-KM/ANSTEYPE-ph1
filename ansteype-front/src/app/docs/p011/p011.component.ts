import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-p011',
  templateUrl: './p011.component.html',
  styleUrls: ['./p011.component.scss'],
})
export class P011Component {
  @Output() fileUploaded = new EventEmitter<File>(); // ファイルを親コンポーネントに送信するEventEmitter

  /**
   * ドラッグオーバーイベントの処理
   * @param event DragEvent ドラッグオーバーイベント
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault(); // デフォルト動作を無効化（ファイルをドロップできるようにする）
  }

  /**
   * ドラッグ＆ドロップでファイルをアップロード
   * @param event DragEvent ドロップイベント
   */
  onFileDrop(event: DragEvent): void {
    event.preventDefault(); // デフォルト動作を無効化
    if (event.dataTransfer?.files?.length) {
      const file = event.dataTransfer.files[0]; // ドロップされたファイルを取得
      if (this.validateFile(file)) {
        this.fileUploaded.emit(file); // 親コンポーネントにファイルを送信
      }
    }
  }

  /**
   * ファイル選択イベントの処理
   * @param event Event ファイル選択イベント
   */
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement; // イベントターゲットをHTMLInputElementにキャスト
    if (input.files && input.files.length > 0) {
      const file = input.files[0]; // 選択されたファイルを取得
      if (this.validateFile(file)) {
        this.fileUploaded.emit(file); // 親コンポーネントにファイルを送信
      }
    }
  }

  /**
   * ファイル入力をリセット
   * @param input HTMLInputElement
   */
  resetFileInput(input: HTMLInputElement): void {
    input.value = ''; // ファイル入力をリセットして、次回の選択を有効化
  }

  /**
   * ファイルの検証
   * @param file 検証するファイル
   * @returns boolean ファイルが有効かどうか
   */
  private validateFile(file: File): boolean {
    if (file.size > 20 * 1024 * 1024) {
      alert('ファイルサイズは20MBを超えることはできません。'); // サイズチェック
      return false;
    }
    return true; // 有効なファイル
  }
}
