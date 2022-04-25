import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Result } from 'src/app/model/result';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private toastrService: ToastrService){}

    showToast(response: Result){
        const toastType = (response.success) ? "success" : "error";
        this.toastrService[toastType](response.message);
    }
}