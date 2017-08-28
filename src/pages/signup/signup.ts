import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {WelcomePage} from '../welcome/welcome';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  responseData : any;
  data = {"userName": "","password": ""};
  public form                   : FormGroup;

  constructor(public navCtrl: NavController, public http : Http,
    public navParams: NavParams,public fb : FormBuilder,
    public toastCtrl  : ToastController) {

     this.form = fb.group({
         "userName"                  : ["", Validators.required],
         "password"           : ["", Validators.required]
      });
  }

  private baseURI : string  = "http://localhost:81/LoginTutorial";
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  createEntry(userName,password){

    let body     : string   = "key=create&userName=" + userName + "&password=" + password,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "/manage-data.php";

      this.http.post(url, body, options)
      .subscribe((data) =>
      {
         // If the request was successful notify the user
         if(data.status === 200)
         {
           
            this.sendNotification(`Congratulations the technology: ${userName} was successfully added`);
         }
         // Otherwise let 'em know anyway
         else
         {
            this.sendNotification('Something went wrong!');


            
         }
      });

  }


  saveEntry()
   {
      let userName          : string= this.data.userName;
        let  password   : string    = this.data.password;
         this.createEntry(userName, password);
         this.navCtrl.push(WelcomePage);
   }

  sendNotification(message)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }

}
