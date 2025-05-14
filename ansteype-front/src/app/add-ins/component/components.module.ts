import { NgModule } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { SkydeskInputDirective } from "./directive/input.directive";


@NgModule({
    declarations: [
        SkydeskInputDirective
    ],
    imports: [
        InputTextModule,
    ],
    exports: [
        SkydeskInputDirective
    ]
})
export class ComponentsModule { }