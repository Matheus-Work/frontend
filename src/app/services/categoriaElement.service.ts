import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategoriaElement } from "src/models/CategoriaElement";
import { Observable } from "rxjs";

@Injectable()
export class CategoriaElementService {
    elementApiUrl = 'http://localhost:44366/categorias';
    constructor(private http: HttpClient){ }

    getElements(): Observable<CategoriaElement[]> {
        return this.http.get<CategoriaElement[]>(this.elementApiUrl);
    }

    creteElement(categ: CategoriaElement) : Observable<CategoriaElement> {
        return this.http.post<CategoriaElement>(this.elementApiUrl, categ);
    }

    editElement(categ: CategoriaElement) : Observable<CategoriaElement> {
        return this.http.put<CategoriaElement>(this.elementApiUrl, categ);
    }
    
    deleteElement(_id:number) : Observable<any>{
        return this.http.delete<any>(`${this.elementApiUrl}/${_id}`);
    }
}