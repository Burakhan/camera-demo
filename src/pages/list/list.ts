import { Component, OnInit } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { SqLiteService } from '../../providers/sqlite-service'
import { DomSanitizer } from '@angular/platform-browser'
import { File } from '@ionic-native/file'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {
  //selectedItem: any
  //photo: string[]
  public img;
  public img2;
  public photos: Array<{ id: string, path: string, _id: string }>
  private getPath3LOG = false;
  constructor (public navCtrl: NavController, public navParams: NavParams, private sqLite: SqLiteService, private sanitizer: DomSanitizer, private file:File) {
    // If we navigated to this page, we will have an item available as a nav param

  }

  ngOnInit (): void {
    this.sqLite.getPhotos().then((res) => {
      this.photos = res
    })
  }

  getPath (path) {
    path = path.replace('file://', '');
    return this.sanitizer.bypassSecurityTrustUrl(path);
  }

  getPath2 (path) {
    this.getPath3(path);
    path = path.replace("assets-library://", "cdvfile://localhost/assets-library/")
    return this.sanitizer.bypassSecurityTrustUrl(path);
  }

  getPath3 (path) {

    this.file.resolveLocalFilesystemUrl(path).then(fileEntry => {
      if(this.getPath3LOG) {
        //console.log(fileEntry);
        //this.getPath3LOG = false;
      }
    });
    path = path.replace("assets-library://", "cdvfile://localhost/assets-library/")
    return this.sanitizer.bypassSecurityTrustUrl(path);
  }

  getPath4 (path) {
    if(!path) {
      return 'yok';
    }
    this.file.resolveLocalFilesystemUrl(path).then( fileEntry => {
      //console.log(fileEntry.toInternalURL());
      this.img = fileEntry.toInternalURL();

    });

    //return this.file.toInternalURL(path);
  }

  itemTapped (event, item) {
    // That's right, we're pushing to ourselves!
    /*
    this.navCtrl.push(ListPage, {
      item: item
    })
    */
  }
}
