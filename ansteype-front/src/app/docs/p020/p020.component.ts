import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { S020Dto } from '../s020/models/s020Dto';

@Component({
    selector: 'app-p020',
    templateUrl: './p020.component.html',
    styleUrl: './p020.component.scss'
})
export class P020Component {
    @Input() dto!: S020Dto ;
    @Output() saveClicked = new EventEmitter<void>();

    constructor(private router: Router) {}

    onSave() {
        this.saveClicked.emit();
    }
}
