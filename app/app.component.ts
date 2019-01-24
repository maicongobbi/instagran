import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import * as firebase from "firebase";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit
{
  title = "app";

  ngOnInit(): void
  {
    var config = {
      apiKey: "AIzaSyCNye967LkGyHt9LYZajkrUX1CdkNIlXRY",
      authDomain: "jta-instagran-clone-19f8f.firebaseapp.com",
      databaseURL: "https://jta-instagran-clone-19f8f.firebaseio.com",
      projectId: "jta-instagran-clone-19f8f",
      storageBucket: "jta-instagran-clone-19f8f.appspot.com",
      messagingSenderId: "203747186714"

    };
    firebase.initializeApp(config);
  }
}
