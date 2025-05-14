import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CurrencyPipe } from "@angular/common";
import { Util } from "./add-ins/common/util";


interface CurrentUser {
    user_id: string;
    user_mail: string;
    user_name_first: string;
    user_name_last: string;
    role: string;
}

@Injectable({
    providedIn: 'root',
})
export class AppService {

    constructor(private http: HttpClient) { }

    setCurrentUser(user: object) {

        localStorage.setItem('ansteype_user', JSON.stringify(user));

    }

    getCurrentUser(): CurrentUser | null {
        const user = localStorage.getItem('ansteype_user');

        if (Util.isEmpty(user))
            return null;

        const result = JSON.parse(user!);

        return result as CurrentUser;

    }

    setLogo(logoFile: any){
        // Base64 to Blob URL
        const byteCharacters = atob(logoFile);
        const byteNumbers = Array.from(byteCharacters).map((char) => char.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });

        localStorage.setItem('ansteype_logoUrl', URL.createObjectURL(blob));
    }

    getLogo(){
        const logoUrl = localStorage.getItem('ansteype_logoUrl');

        if (Util.isEmpty(logoUrl))
            return null;

        return logoUrl;
    }


}
