import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { BookData } from './BookData';
import { AppComponentService } from "./app.component.service";
import { Injectable } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppComponentService]
})
@Injectable()
export class AppComponent {
  tabClicked: string;

  constructor(
    private appComponentService: AppComponentService, private http: Http) { }

  public postProfile(book: BookData): void {
    this.appComponentService.postProfile(book);
  }

  public convertFile(event: any) {
    let file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      let text = reader.result;
      console.log(this.csvJSON(text));
    };
    reader.readAsText(file);
  };

  public csvJSON(csv) {
    var lines = csv.split("\n");
    var result = [];
    var value: String;
    var headers = lines[0].replace("\r", "").split(",");
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        if (currentline[j] == null)
          obj[headers[j]] = ""
        else {
          value = currentline[j].replace("\r", "");
          obj[headers[j]] = value;
        }
      }
      result.push(obj);
    }
    this.postUsersData("{\"CrmUsers\" :" + JSON.stringify(result) + "}");
  }

  private postUsersData(body: String) {
    console.log("posting Users Details :" + body);
    const url: string = "http://localhost:8181/insertRecord";
    const headers = new Headers({ "Content-Type": "application/json" });
    const options = new RequestOptions({ headers });
    return this.http.post(url, body, options).subscribe();
  }

  myFirst() {
    var x = document.getElementById("First");
    x.style.display = "none";
    var y = document.getElementById("Second");
    y.style.display = "block";
  }
  mySecond() {
    var y = document.getElementById("Second");
    y.style.display = "none";
    var x = document.getElementById("First");
    x.style.display = "block";
  }
  ngOnInit() {

    var updateProfile = document.getElementById("update-prodfile");
    updateProfile.style.display = "block";

    var uploadUsers = document.getElementById("upload-users");
    uploadUsers.style.display = "none";

    var y = document.getElementById("Second");
    y.style.display = "none";

    this.tabClicked = 'Customer';

  }

  enableUploadUsers() {
    var updateProfile = document.getElementById("update-prodfile");
    updateProfile.style.display = "none";

    var uploadUsers = document.getElementById("upload-users");
    uploadUsers.style.display = "block";
  }

  enableUploadProfile() {
    var updateProfile = document.getElementById("update-prodfile");
    updateProfile.style.display = "block";

    var uploadUsers = document.getElementById("upload-users");
    uploadUsers.style.display = "none";
  }

}
