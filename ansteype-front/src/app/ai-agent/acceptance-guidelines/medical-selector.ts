
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'medical-selector',
    templateUrl: './medical-selector.html',
    styleUrls: ['./medical-selector.css']
})
export class MedicalSelectorComponent implements OnInit {

    constructor(private http: HttpClient) { }

    public ngOnInit(): void {

        this.http.get<{ id: number; name: string }[]>('/api/acceptance/get_medicals').subscribe(
            (data: { id: number; name: string }[]) => {

                console.log(data);
                // process the configuration.
            });

    }

    @Output() onSelect = new EventEmitter<any>();
    @Output() onClose = new EventEmitter<void>();

    searchTerm: string = '';
    selectedMedical: any = null;

    // 假设病名数据
    medical = [
        { id: 1, name: '〇〇病１' },
        { id: 2, name: '〇〇病2' },
        { id: 3, name: '〇〇病3' },
        { id: 4, name: '〇〇病4' },
        { id: 5, name: '〇〇病5' },
        { id: 6, name: '〇〇病6' },
        { id: 7, name: '〇〇病7' },
        { id: 8, name: '〇〇病8' },
        { id: 9, name: '〇〇病9' },
        { id: 10, name: '〇〇病10' },
        { id: 11, name: '〇〇病11' },
        { id: 12, name: '〇〇病12' },
    ];

    filteredMedical = [...this.medical];

    // 根据输入框内容过滤列表
    filterList() {
        if (this.searchTerm.trim()) {
            this.filteredMedical = this.medical.filter(medical =>
                medical.name.includes(this.searchTerm)
            );

            // 如果只剩下一个病名，自动选中
            if (this.filteredMedical.length === 1) {
                this.selectedMedical = this.filteredMedical[0];
            }
        } else {
            this.filteredMedical = [...this.medical];
        }
    }

    // 选择病名
    inputSelection() {
        this.searchTerm = this.selectedMedical.name;
    }

    // 确认选择
    confirmSelection() {
        if (this.selectedMedical) {
            this.onSelect.emit(this.selectedMedical);
            this.onClose.emit();
        }
    }
}
