import { Injectable } from "@angular/core";
import { BookData } from './BookData';


@Injectable()
export class AppComponentService {

    constructor() { }

    public postProfile(book: BookData) {
        var file = (<HTMLInputElement>document.getElementById('fileInput')).files[0];
    }

    
}