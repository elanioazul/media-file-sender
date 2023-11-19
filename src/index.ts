import { UsbManager } from './classes/usb-manager';

//my usb device details
const VENDOR_ID = 0x0930;
const PRODUCT_ID = 0x6545;
const sourceDirectory = '/media/hugoherrador/MI PEN';
const targetDirectory = 'camfiles-source';

const usbManager = new UsbManager(VENDOR_ID, PRODUCT_ID); 
const found = usbManager.findDevice();

const main = async () => {
  try {
    const foundDirectory = await usbManager.findDirectory(sourceDirectory, targetDirectory);

    if (foundDirectory) {
      console.log(`Found target directory: ${foundDirectory}`);
    } else {
      console.log(`Target directory not found.`);
    }
  } catch (error) {
    console.error(`Error finding target directory: ${error}`);
  }
};

if (found) {
  usbManager.logDeviceDetails(found).catch(error => console.error('Error:', error));
  usbManager.listDirectories(sourceDirectory);
  main();
} else {
  console.log('USB mass storage device not found.');
}
