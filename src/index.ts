import * as usb from 'usb';

const VENDOR_ID = 0x0930;
const PRODUCT_ID = 0x6545;

interface USBDeviceDescriptor {
  idVendor: number;
  idProduct: number;
  iManufacturer: number;
  iProduct: number;
  iSerial: number;
}

const findDevice = (): usb.Device | undefined => {
  const devices = usb.getDeviceList();
  return devices.find(device => device.deviceDescriptor.idVendor === VENDOR_ID && device.deviceDescriptor.idProduct === PRODUCT_ID);
};

const logDeviceDetails = async (device: usb.Device): Promise<void> => {
  device.open();

  const deviceDescriptor: any = device.deviceDescriptor;

  console.log('USB Mass Storage Device Details:');
  console.log('Vendor ID:', deviceDescriptor.idVendor);
  console.log('Product ID:', deviceDescriptor.idProduct);

  const manufacturer = await getStringDescriptor(device, deviceDescriptor.iManufacturer);
  const product = await getStringDescriptor(device, deviceDescriptor.iProduct);
  const serialNumber = await getStringDescriptor(device, deviceDescriptor.iSerial);

  console.log('Manufacturer:', manufacturer);
  console.log('Product:', product);
  console.log('Serial Number:', serialNumber);

  device.close();
};

const getStringDescriptor = (device: usb.Device, desc_index: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    device.getStringDescriptor(desc_index, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value || '');
      }
    });
  });
};

const usbDevice = findDevice();

if (usbDevice) {
  logDeviceDetails(usbDevice).catch(error => console.error('Error:', error));
} else {
  console.log('USB mass storage device not found.');
}
