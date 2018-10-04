import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Http, Response, Headers, RequestOptions } from "@angular/http";
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
  contactList: Observable<Array<any>>;
  disable: Boolean;
  accountList: Observable<Array<any>>;

  isDashBoardGenerated:boolean = true;

  constructor(private http: Http) { }
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
    this.postUsersData("{\"ContactList\" :" + JSON.stringify(result) + "}");
    this.enableProceedButton();
    this.enableSuccessExcelUpload();
  }

  private postUsersData(body: String) {
    console.log("posting Users Details :" + body);
    const url: string = "http://54.242.101.181:3001/insertRecord";
    const headers = new Headers({ "Content-Type": "application/json" });
    const options = new RequestOptions({ headers });
    return this.http.post(url, body, options).subscribe();
  }

  enableProceedButton() {
    (<HTMLInputElement> document.getElementById("proceed1")).disabled = false;
  }

  enableSuccessExcelUpload() {
    (<HTMLInputElement> document.getElementById("excel-div")).style.display = "none";
    (<HTMLInputElement> document.getElementById("success-excel-div")).style.display = "block";
  }

  getContacts(): Observable<any> {
    let url = "http://54.242.101.181:3001/contacts";
    return this.http.get(url).pipe(map((response: Response) => {
        return response.json();
    }));
}

  myFirst() {

    this.getContacts().subscribe((data: any) => console.log("contacts :",this.contactList = data));

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

    (<HTMLInputElement> document.getElementById("proceed1")).disabled = true;

    (<HTMLInputElement> document.getElementById("success-excel-div")).style.display = "none";

    this.getAccounts().subscribe((data: any) => console.log("accounts :",this.accountList = data));

  }

  getAccounts(): Observable<any> {
    let url = "http://54.242.101.181:3001/accounts";
    return this.http.get(url).pipe(map((response: Response) => {
        return response.json();
    }));
}

  enableUploadUsers() {

    var updateProfile = document.getElementById("update-prodfile");
    updateProfile.style.display = "none";

    var uploadUsers = document.getElementById("upload-users");
    uploadUsers.style.display = "block";

    var uploadUsers = document.getElementById("proceed-dashboard");
    uploadUsers.style.display = "none";
  }

  enableUploadProfile() {
    var updateProfile = document.getElementById("update-prodfile");
    updateProfile.style.display = "block";

    var uploadUsers = document.getElementById("upload-users");
    uploadUsers.style.display = "none";
  }

  async toStep4() {

    var uploadUsers = document.getElementById("upload-users");
    uploadUsers.style.display = "none";

    var uploadUsers = document.getElementById("proceed-dashboard");
    uploadUsers.style.display = "block";

    this.isDashBoardGenerated = false;

    await this.delay(10000);

    window.location.href='http://54.242.101.181:4203';

  } 

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
