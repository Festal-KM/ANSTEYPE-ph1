import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { S024Dto } from '../s024/models/s024Dto';

@Component({
    selector: 'app-p024',
    templateUrl: './p024.component.html',
    styleUrl: './p024.component.scss'
})
export class P024Component {
    @Input() dto!: S024Dto ;
    @Output() saveClicked = new EventEmitter<void>();

    constructor(private router: Router) {}

    onSave() {
        this.saveClicked.emit();
    }
}
