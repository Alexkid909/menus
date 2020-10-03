import { Injectable } from '@angular/core';
import { HttpEventType, HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  apiUrl = 'https://localhost:8443';

  constructor(private http: HttpClient) {}

  public uploadFile(file: any) {
    const callUrl = `${this.apiUrl}/uploads`;
    const options = {
      reportProgress: true
    };
    return this.http.post(callUrl, { imageFile: file }, options);
  }

}
