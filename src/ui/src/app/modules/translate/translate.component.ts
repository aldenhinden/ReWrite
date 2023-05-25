import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
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

  // Information that keeps track of changes by the user
  EMPTY_FORM = new FormData();
  curr_file = this.EMPTY_FORM;
  file_name:string = "";
  api_key = "";
  translation_type = "";
  translation = "Waiting for translation...";

  // Stores API Key information when user updates the API Key text box
  onKeyUpload(key: string) {
    this.api_key = key;
  }

  // Saves the current PDF file that the user uploaded
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

  // Saves the type of summarization for the uploaded PDF file that the user selected
  onTranslationType(type: string) {
    if (type != "default") {
      this.translation_type = type;
      console.log(this.translation_type);
    }
  }

  // Sends the PDF file information, API Key information, and type of translation to the backend server to handle summarization
  onTranslate() {
    if (!this.api_key || !this.translation_type || !this.file_name) {
      // error check user input API key
      if (!this.api_key) {
        alert("Please provide an API key before translating.");
      } else if (!this.file_name) {
        alert("Please upload a PDF file.");
      } else if (!this.translation_type) {
        alert("Please select a translation type.");
      }
      return;
    }

    this.translation = "Waiting for translation...";
    console.log("API KEY: " + this.api_key);
    console.log(this.curr_file);
    this.curr_file.set('key', this.api_key);
    this.curr_file.set('type', this.translation_type);
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
