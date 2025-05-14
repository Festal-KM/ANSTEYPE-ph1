import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Util } from '../../add-ins/common/util';

@Component({
  selector: 'app-p005',
  templateUrl: './p005.component.html',
  styleUrl: './p005.component.scss'
})
export class P005Component {
  
  private _pdfSrcLarge: string | null = null;
  safePdfUrl: SafeResourceUrl | null = null;
  isVisible: boolean = false;
  constructor(private sanitizer: DomSanitizer) {}
  set pdfSrcLarge(value: string | null) {
    if (value) {
      const urlWithParams = `${value}#toolbar=0&navpanes=0&scrollbar=1&zoom=100`;
      this._pdfSrcLarge = urlWithParams;
      this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urlWithParams);
      console.log("Sanitized PDF URL:", this.safePdfUrl);
    }
  }

  get pdfSrcLarge(): string | null {
    return this._pdfSrcLarge;
  }

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}