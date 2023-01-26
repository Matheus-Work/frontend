import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProdutoElement } from "src/models/ProdutoElement";

@Injectable()
export class ProdutoElementService {
    elementApiUrl = 'http://localhost:44366/produtos';
    constructor(private http: HttpClient){ }
    
    getElements(): Observable<ProdutoElement[]>{
        return this.http.get<ProdutoElement[]>(this.elementApiUrl);
    }
    creteElements(element: ProdutoElement) : Observable<ProdutoElement> {
        return this.http.post<ProdutoElement>(this.elementApiUrl, element);
    }
    editElement(element: ProdutoElement) : Observable<ProdutoElement> {
        return this.http.put<ProdutoElement>(this.elementApiUrl, element);
    }
    
    deleteELement(_id:number) : Observable<any>{
        return this.http.delete<any>(`${this.elementApiUrl}/${_id}`);
    }
}
   
