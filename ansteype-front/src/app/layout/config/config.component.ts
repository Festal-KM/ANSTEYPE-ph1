import { Component, Inject, Input, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { MenuService } from '../menu/menu.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'skydesk-ui-config',
    templateUrl: './config.component.html',
})
export class ConfigComponent implements OnInit {

    @Input() hidden: boolean = false;

    @Input() minimal: boolean = false;

    currentDay: Date = new Date();

    scales: number[] = [12, 13, 14, 15, 16];

    languages: { name: string; code: string; }[] | undefined;

    constructor(
        public layoutService: LayoutService,
        public menuService: MenuService
    ) { }

    ngOnInit(): void {
        this.languages = environment.languages;

    }

    get selectedLanguage(): string {
        return this.layoutService.config().language;
    }
    
    set selectedLanguage(_val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            language: _val,
        }));
    }

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }
    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get scale(): number {
        return this.layoutService.config().scale;
    }
    set scale(_val: number) {
        this.layoutService.config.update((config) => ({
            ...config,
            scale: _val,
        }));
    }
    decrementScale() {
        this.scale--;
    }

    incrementScale() {
        this.scale++;
    }

    get menuMode(): string {
        return this.layoutService.config().menuMode;
    }
    set menuMode(_val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            menuMode: _val,
        }));
    }

    get inputStyle(): string {
        return this.layoutService.config().inputStyle;
    }
    set inputStyle(_val: string) {
        this.layoutService.config().inputStyle = _val;
    }

    get ripple(): boolean {
        return this.layoutService.config().ripple;
    }
    set ripple(_val: boolean) {
        this.layoutService.config.update((config) => ({
            ...config,
            ripple: _val,
        }));
    }

    set theme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            theme: val,
        }));
    }
    get theme(): string {
        return this.layoutService.config().theme;
    }

    changeTheme(theme: string, colorScheme: string) {
        this.theme = theme;
        this.colorScheme = colorScheme;
    }

    set colorScheme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            colorScheme: val,
        }));
    }
    get colorScheme(): string {
        return this.layoutService.config().colorScheme;
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

}
