import { EventEmitter } from 'events';
import { usb, getDeviceList, findByIds, findBySerialNumber, WebUSBDevice, webusb, WebUSB} from 'usb';
import { UsbObserver } from '../interfaces/usb-observer-interface';
import { env } from 'process';
import dotenv from 'dotenv';
dotenv.config();

export class UsbManager {
  private usbEmitter: EventEmitter = new EventEmitter();
  private usbDevice: usb.Device | null = null;

  constructor(private vendorId: any, private productId: any) {
    
    //this.initUsb();
    const targetPapaSerialNumber = '12100602000243';
    const targetSerialNumber = '001D0F1886A15B890B020984';
    const targetTeeCamSerialNumber = 'ú';
    // const matchingDevice = this.findDeviceBySerialNumber(targetSerialNumber);

    // if (matchingDevice) {
    //   console.log('Found the matching USB device:', matchingDevice);
    // } else {
    //   console.log('No matching USB device found.');
    // }
  //   (async () => {
  //     // Uses a blocking call, so is async
  //     const device = await findBySerialNumber(targetTeeCamSerialNumber);
  
  //     if (device) {
  //         console.log(device); // Legacy device
  //     } else {
  //       console.log('no device found from usb findBySerialNumber function')
  //     }
  // })();
//   (async () => {
//     // Uses a blocking call, so is async
//     const device = await findBySerialNumber(targetTeeCamSerialNumber);

//     // Uses blocking calls, so is async
//     if (device) {
//       const webDevice = await WebUSBDevice.createInstance(device);
//       if (webDevice) {
//           console.log(webDevice); // WebUSB device
//       }
//     }

// })();
// (async () => {
//   // Returns first matching device
//   const device = await webusb.requestDevice({
//       filters: [{}]
//   })

//   console.log(device); // WebUSB device
// })();
// (async () => {
//   const customWebUSB = new WebUSB({
//       // This function can return a promise which allows a UI to be displayed if required
//       devicesFound: (devices: any) => devices.find((device: any) => device.serialNumber === targetPapaSerialNumber)
//   });

//   // Returns device based on injected 'devicesFound' function
//   const device = await customWebUSB.requestDevice({
//       filters: [{}]
//   })

//   console.log(device); // WebUSB device
// })();
    const device = findByIds(vendorId, productId);

    if (device) {
        console.log(device); // Legacy device
    }
    // const devices = getDeviceList();

    // for (const device of devices) {
    //     console.log(device); // Legacy device
    // }
  }

  // findDeviceBySerialNumber(serialNumber: string) {
  //   // Get a list of all USB devices
  //   const deviceList = usb.getDeviceList();
  
  //   // Iterate through the list of devices
  //   for (const device of deviceList) {
  //     try {
  //       // Open the device to access its properties
  //       device.open();
  
  //       // Get the serial number of the device
  //       //const deviceSerialNumber = device.getStringDescriptor(2); // Assumes serial number is at index 2
  
  //       // Close the device after accessing its properties
  //       device.close();
  
  //       // Check if the serial number matches the target
  //       // if (deviceSerialNumber === serialNumber) {
  //       //   return device; // Found a matching device
  //       // }
  //     } catch (error) {
  //       console.error('Error accessing device:', error);
  //     }
  //   }
  
  //   return null; // No matching device found
  // }

  // private initUsb() {
  //   usb.on('attach', (device) => {
  //     console.log('usb on???')
  //     if (this.isTargetDevice(device)) {
  //       this.usbDevice = device;
  //       this.usbEmitter.emit('attach', device);
  //     }
  //   });

  //   usb.on('detach', (device) => {
  //     if (this.isTargetDevice(device)) {
  //       this.usbDevice = null;
  //       this.usbEmitter.emit('detach', device);
  //     }
  //   });
  // }

  // private isTargetDevice(device: usb.Device): boolean {
  //   //return process.env.USBSERIALNUMBER === usb.
  //   // return (
  //   //   device.deviceDescriptor.idVendor === this.vendorId &&
  //   //   device.deviceDescriptor.idProduct === this.productId
  //   // );
  // }

  public attachObserver(observer: UsbObserver) {
    console.log('attaching??')
    this.usbEmitter.on('attach', (device) => observer.onUsbAttach(device));
  }

  public detachObserver(observer: UsbObserver) {
    console.log('detaching???')
    this.usbEmitter.on('detach', (device) => observer.onUsbDetach(device));
  }
}
//export { UsbObserver };

