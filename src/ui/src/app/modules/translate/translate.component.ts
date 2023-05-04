import { Component } from '@angular/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent {

  ngOnInit(): void{
  }

  EMPTY_FORM = new FormData();
  curr_file = this.EMPTY_FORM;

  onChange(event: any) {
    if (event.target.files.length > 0 && event.target.files[0].type == "application/pdf") {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
        
      this.curr_file = formData;
    } else {
      this.curr_file = this.EMPTY_FORM;
    }
  }

}
