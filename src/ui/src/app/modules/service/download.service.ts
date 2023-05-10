import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) {
  }

  downloadFile(doc_name: string): Observable<any> {
    const param = new HttpParams().set('filename', doc_name);
    const options = {
      params: param
    };
    return this.http.get('http://localhost:3000/simplified', {...options, responseType: 'blob'});
  }
}
