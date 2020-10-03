import { Component, OnInit } from '@angular/core';
import {FilesService} from '../files.service';
import { HttpEventType} from '@angular/common/http';
import {Form, FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  uploadForm: FormGroup;

  constructor(private filesService: FilesService,
              public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  uploadFile() {

    const file = this.uploadForm.get('profile').value;
    console.log(file);

    this.filesService.uploadFile(file).subscribe((event: any) => {
      // progress
      if (event.type === HttpEventType.DownloadProgress) {
        console.log(event.loaded, event.total);
        // event.loaded = bytes transfered
        // event.total = "Content-Length", set by the server

        const percentage = 100 / event.total * event.loaded;
        console.log(percentage);
      }

      // finished
      if (event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    });
  }
}
