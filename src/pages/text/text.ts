import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GoogleCloudVisionServiceProvider } from "../../providers/google-cloud-vision-service/google-cloud-vision-service";
import { Camera, CameraOptions } from "@ionic-native/camera";
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-text',
  templateUrl: 'text.html',
})
export class TextPage {
  textitems: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,   private camera: Camera,
    private vision: GoogleCloudVisionServiceProvider,
    private db: AngularFireDatabase,
    private alertCtrl: AlertController) {
      this.textitems = db.list("VisionTextItems");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TextPage');
  }

  saveResults(imageData, results) {
    this.textitems
      .push({ imageData: imageData, results: results })
      .then(_ => {})
      .catch(err => {
        this.showAlert(err);
      });
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: "Error",
      subTitle: message,
      buttons: ["OK"]
    });
    alert.present();
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.vision.getTextLabels(imageData).subscribe(
          result => {
            this.saveResults(imageData, result.json().responses);
          },
          err => {
            this.showAlert(err);
          }
        );
      },
      err => {
        this.showAlert(err);
      }
    );
  }

}
