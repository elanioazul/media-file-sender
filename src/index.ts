import { UsbManager } from './classes/usb-manager';
import { UsbObserver } from './interfaces/usb-observer-interface';
import { FileManager } from './classes/file-manager';
import { MediaUploader } from './classes/media-uploader';
import * as usb from 'usb';
import * as fs from 'fs';
import * as path from 'path';
import { env } from 'process';
import dotenv from 'dotenv';
//USBSTOR\DISK&VEN_KINGSTON&PROD_DATATRAVELER_2.0&REV_PMAP\001D0F1886A15B890B020984&0
//VENDOR ID = KINGSTON
//DEVICE ID = PMAP\001D0F1886A15B890B020984&0
// 001D0F1886A15B890B020984
dotenv.config();

//const usbManager = new UsbManager('KINGSTON', 'PMAP/001D0F1886A15B890B020984&0'); // Replace VID and PID with your USB device's values
//const usbManager = new UsbManager('0x0930', '6x545'); // Replace VID and PID with your USB device's values
//const usbManager = new UsbManager('0930', '6545'); // Replace VID and PID with your USB device's values
const usbManager = new UsbManager('125F', 'C08A'); // Replace VID and PID with your USB device's values

//const sourceDirectory = '/path/to/source/directory';
const sourceDirectory = 'D:/camfiles-source';
const destinationDirectory = './files';

const fileManager = new FileManager(sourceDirectory, destinationDirectory);
const mediaUploader = new MediaUploader(process.env.ENDPOINT as string);

class MediaProcessor implements UsbObserver {
  constructor(){}
  onUsbAttach(device: usb.Device) {
    console.log('desde usb o ke')
    const mediaFiles = fs.readdirSync(sourceDirectory).filter((file) => {
      const extname = path.extname(file).toLowerCase();
      return extname === '.mp4' || extname === '.png';
    });

    mediaFiles.forEach(async (file) => {
      const sourceFilePath = path.join(sourceDirectory, file);
      const destinationFilePath = path.join(destinationDirectory, file);

      if (!fileManager.fileExists(destinationFilePath)) {
        await fileManager.copyFile(sourceFilePath, destinationFilePath);
        try {
          const response = await mediaUploader.uploadFile(destinationFilePath);
          console.log('File uploaded successfully:', response.data);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    });
  }

  onUsbDetach(device: usb.Device) {
    // Handle detach event if needed
    console.log('usb detached')
  }
}

const mediaProcessor = new MediaProcessor();
usbManager.attachObserver(mediaProcessor);


// const fs = require('fs');
// const ExifParser = require('exif-parser');

// function extractCoordinates(filePath: string) {
//   try {
//     const fileData = fs.readFileSync(filePath);
//     const exifParser = ExifParser.create(fileData);
//     const result = exifParser.parse();
    
//     if (result && result.tags && result.tags.GPSLatitude && result.tags.GPSLongitude) {
//       const latitude = result.tags.GPSLatitude;
//       const longitude = result.tags.GPSLongitude;
//       return {
//         latitude: `${latitude[0]}° ${latitude[1]}' ${latitude[2]}" ${result.tags.GPSLatitudeRef}`,
//         longitude: `${longitude[0]}° ${longitude[1]}' ${longitude[2]}" ${result.tags.GPSLongitudeRef}`,
//       };
//     } else {
//       return null; // No GPS coordinates found in the EXIF data
//     }
//   } catch (error: any) {
//     console.error(`Error parsing EXIF data: ${error.message}`);
//     return null;
//   }
// }

// function hasExifData(filePath: string) {
//   try {
//     const fileData = fs.readFileSync(filePath);
//     const exifParser = ExifParser.create(fileData);
//     const result = exifParser.parse();
    
//     return Boolean(result && result.tags);
//   } catch (error: any) {
//     console.error(`Error checking for EXIF data: ${error.message}`);
//     return false;
//   }
// }

// // Example usage
// const filePath = './files/DSCF0014.JPG';
// const hasExif = hasExifData(filePath);

// if (hasExif) {
//   console.log(`${filePath}` + ' contains EXIF metadata.');
//   const coordinates = extractCoordinates(filePath);
//   if (coordinates) {
//     console.log(`Latitude: ${coordinates.latitude}`);
//     console.log(`Longitude: ${coordinates.longitude}`);
//   } else {
//     console.log('No GPS coordinates found in the EXIF data.');
//   }
// } else {
//   console.log(`${filePath}` + ' does not contains EXIF metadata.');
// }