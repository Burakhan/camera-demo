import { Component } from '@angular/core'
import { NavController, normalizeURL } from 'ionic-angular'
import { Camera, CameraOptions } from '@ionic-native/camera'
import { SqLiteService } from '../../providers/sqlite-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor (public navCtrl: NavController,
               private camera: Camera,
               private sqLite: SqLiteService) {

  }

  takePhoto () {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log('take photo')
      this.sqLite.insertPhoto(normalizeURL(imageData), 5, false);
      console.log(normalizeURL(imageData));

    }, (err) => {
      // Handle error
    })
  }

}
