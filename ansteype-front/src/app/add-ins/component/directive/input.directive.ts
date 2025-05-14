import { Directive, OnInit } from "@angular/core";
import { InputText } from "primeng/inputtext";

@Directive({
    selector: 'p-radioButton[formControlName]'
})
export class SkydeskInputDirective implements OnInit {

    constructor(
        private input: InputText
    ) { }

    ngOnInit(): void {
        console.log('SkydeskInputDirective');
    
    }
}  