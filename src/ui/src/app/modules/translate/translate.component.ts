import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpParams } from '@angular/common/http'
import { Base64 } from 'js-base64';
import * as fileSaver from 'file-saver';
import { DownloadService } from '../service/download.service';


@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent {

  ngOnInit(): void{
  }

  constructor(
    private http:HttpClient,
    private downloadService: DownloadService
    ) { }

  EMPTY_FORM = new FormData();
  curr_file = this.EMPTY_FORM;
  file_name:string = "";
  api_key = "";
  translation = "Waiting for translation...";

  onKeyUpload(key: string) {
    this.api_key = key;
  }

  onFileUpload(event: any) {
    if (event.target.files.length > 0) {
      const upload = event.target.files[0];
      if (upload.type !== 'application/pdf') {
        // error check for PDF type upload
        alert("Please upload a PDF file.");
        return;
      }
      const file = event.target.files[0];
      this.file_name = file.name;
      const formData = new FormData();
      formData.append('doc', file);
      this.curr_file = formData;
    } else {
      this.curr_file = this.EMPTY_FORM;
    }
  }

  onTranslate() {
    if (!this.api_key) {
      // error check user input API key
      alert("Please provide an API key before translating.");
      return;
    }
    this.translation = "Waiting for translation...";
    console.log("API KEY: " + this.api_key);
    console.log(this.curr_file);
    this.curr_file.set('key', this.api_key);
    this.http.post('http://localhost:3000/upload', this.curr_file).subscribe(response => {
      console.log(response);
      let res = JSON.parse(JSON.stringify(response));
      let simplified = res.text;

      this.translation = simplified;

      // this.downloadService.downloadFile(this.file_name).subscribe( res => {
      //   if (res) {
      //     console.log("DOWNLOADING");
      //     fileSaver.saveAs(new Blob([res], {type: 'application/pdf'}), "simplified_"+this.file_name);
      //   }
      // })


    });
  }
}
