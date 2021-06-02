import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public uploadForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
    this.uploadForm = this.formBuilder.group({
      files: ['']
    });
  }

  ngOnInit() {

  }

  onFileSelect(event: any) {
    if (event?.target?.files?.length > 0) {
      const file = event?.target?.files[0];
      this.uploadForm?.get('files')?.setValue(file);
    }
  }

  public onSubmit() {
    const SERVER_URL = "http://localhost:3000/upload";
    const formData = new FormData();
    formData.append('file', this.uploadForm?.get('files')?.value);
    formData.append('whatever', 'nothing');

    this.httpClient.post<any>(SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  };
}
