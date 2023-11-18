import { UsbManager } from './classes/usb-manager';

//my usb device details
const VENDOR_ID = 0x0930;
const PRODUCT_ID = 0x6545;
const sourceDirectory = '/media/hugoherrador/MI PEN';

const usbManager = new UsbManager(VENDOR_ID, PRODUCT_ID); 
const found = usbManager.findDevice();

if (found) {
  usbManager.logDeviceDetails(found).catch(error => console.error('Error:', error));
  usbManager.listDirectories(sourceDirectory);
} else {
  console.log('USB mass storage device not found.');
}
