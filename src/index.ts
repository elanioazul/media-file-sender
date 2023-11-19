import { UsbManager } from './classes/usb-manager';
import { MediaUploader } from './classes/media-uploader';


//my usb device details
const VENDOR_ID = 0x0930;
const PRODUCT_ID = 0x6545;
const sourceDirectory = '/media/hugoherrador/MI PEN';
const targetDirectory = 'camfiles-source';

const usbManager = new UsbManager(VENDOR_ID, PRODUCT_ID); 
const uploader = new MediaUploader(process.env.ENDPOINT as string)


const main = async () => {
  try {
    const foundTargetDirectory = await usbManager.findDirectory(sourceDirectory, targetDirectory);
    const device = usbManager.findDevice();

    if (foundTargetDirectory && device !== undefined) {
      await usbManager.logDeviceDetails(device).catch(error => console.error('Error:', error));
      await usbManager.listDirectories(sourceDirectory);
      console.log(`Found target directory: ${foundTargetDirectory}`);
      usbManager.watchDirectory(sourceDirectory + '/' + targetDirectory, uploader); 
    } else {
      console.log(`Target directory not found.`);
    }
  } catch (error) {
    console.error(`Error finding target directory in device: ${error}`);
  }
};
main();
// if (found) {
//   usbManager.logDeviceDetails(found).catch(error => console.error('Error:', error));
//   usbManager.listDirectories(sourceDirectory);
//   main();
// } else {
//   console.log('USB mass storage device not found.');
// }
