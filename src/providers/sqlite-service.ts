import { Injectable } from '@angular/core'
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'

/*
  Generated class for the SqLiteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqLiteService {

  public database

  constructor (private sqlite: SQLite) {

  }

  openDB () {
    if (this.database)
      return this.database

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.database = db
      this.database.executeSql('CREATE TABLE IF NOT EXISTS photo (id INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT, _id INTEGER, upload BOOLEAN DEFAULT false)', {})
        .then((data) => {
          console.log('TABLE CREATED: ', data)
          // alert('db and table created ')
        }, (error) => {
          console.error('Unable to execute sql', error)
        })
    }, (error) => {
      console.error('Unable to open database', error)
    })
  }

  public insertPhoto (path, _id, upload) {
    if (!this.database)
      return this.openDB()

    return this.database.executeSql(
      'INSERT INTO PHOTO (path, _id, upload) VALUES (?, ?, ?)',
      [path, _id, upload]
    ).then(res => {
    })
  }

  public getPhotos () {
    if (!this.database)
      return this.openDB()

    return new Promise((resolve, reject) => {

      this.database.executeSql('SELECT * FROM photo', [])
        .then((data: any) => {

          let items: any = []
          if (data.rows.length > 0) {
            let k
            for (k = 0; k < data.rows.length; k++) {
              items.push(data.rows.item(k))

            }
          }
          resolve(items)
        })
        .catch((error: any) => {
          reject(error)
        })

    })
  }

  public getPhotosCount () {
    if (!this.database)
      return this.openDB()

    return new Promise((resolve, reject) => {

      this.database.executeSql('SELECT count(*) as count FROM photo WHERE upload = "false"', [])
        .then((data: any) => {
          console.log(data.rows.item(0).count)
          resolve(data.rows.item(0).count)
        })
        .catch((error: any) => {
          reject(error)
        })

    })
  }

  public getPhotoNotUpload () {
    if (!this.database)
      return this.openDB()

    return new Promise((resolve, reject) => {

      this.database.executeSql('SELECT * FROM photo WHERE upload = "false"', [])
        .then((data: any) => {
          console.log(data);
          let items: any = []
          if (data.rows.length > 0) {
            let k
            for (k = 0; k < data.rows.length; k++) {
              items.push(data.rows.item(k))

            }
          }
          resolve(items)
        })
        .catch((error: any) => {
          reject(error)
        })

    })
  }

  public updatePhotoUpload (photoId) {
    if (!this.database)
      return this.openDB()

    return this.database.executeSql(
      'UPDATE PHOTO SET upload = 1 WHERE id = ',
      [photoId]
    );
  }

}
