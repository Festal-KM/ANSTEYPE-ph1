import { Directive, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlLabel]',
})
export class FormControlLabelDirective implements OnInit {
  @Input('formControlLabel') label!: string;

  constructor(private ngControl: NgControl) {}

  ngOnInit(): void {
    const control = this.ngControl.control;
    if (control) {
      (control as any).label = this.label;
    }
  }
}
