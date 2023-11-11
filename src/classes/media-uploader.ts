import axios from 'axios';
import FormData from 'form-data';
import * as fs from 'fs';
import { env } from 'process';
import dotenv from 'dotenv';

dotenv.config();

export class MediaUploader {
  constructor(private uploadUrl: string) {
  }

  public uploadFile(filePath: string): Promise<any> {
    /*The special thing about FormData is that network methods, such as fetch, can accept a FormData object as a body. 
    It’s encoded and sent out with Content-Type: multipart/form-data.*/
    const formData = new FormData();

    formData.append('ownerName', process.env.OWNERNAME);
    formData.append('ownerSurname', process.env.OWNERSURNAME);;
    formData.append('ownerDni', process.env.OWNERDNI);
    formData.append('ownerTelegramUser', process.env.OWNERTELEGRAMUSER);
    formData.append('ownerPhone', process.env.OWNERPHONE);
    formData.append('ownerEmail', process.env.OWNEREMAIL);

    formData.append('camAlias', process.env.CAMALIAS);
    formData.append('camBrand', process.env.CAMBRAND);
    formData.append('camModel', process.env.CAMMODEL);
    formData.append('camHasGeoCapabilities', process.env.CAMHASGEOCAPABILITIES);

    formData.append('file', fs.createReadStream(filePath));

    return axios.post(this.uploadUrl, formData, {
      headers: formData.getHeaders(),
    });

  }

}
