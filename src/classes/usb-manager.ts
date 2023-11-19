import * as usb from 'usb';
import * as fs from 'fs';
import * as path from 'path';

import { env } from 'process';
import dotenv from 'dotenv';
dotenv.config();

export class UsbManager {

  constructor(private vendorId: any, private productId: any) {}

  getStringDescriptor = (device: usb.Device, desc_index: number): Promise<string> => {
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

  findDevice = (): usb.Device | undefined => {
    const devices = usb.getDeviceList();
    return devices.find(device => device.deviceDescriptor.idVendor === this.vendorId && device.deviceDescriptor.idProduct === this.productId);
  };

  logDeviceDetails = async (device: usb.Device): Promise<void> => {
    device.open();
  
    const deviceDescriptor: any = device.deviceDescriptor;
  
    console.log('USB Mass Storage Device Details:');
    console.log('Vendor ID:', deviceDescriptor.idVendor);
    console.log('Product ID:', deviceDescriptor.idProduct);
  
    const manufacturer = await this.getStringDescriptor(device, deviceDescriptor.iManufacturer);
    const product = await this.getStringDescriptor(device, deviceDescriptor.iProduct);
    const serialNumber = await this.getStringDescriptor(device, deviceDescriptor.iSerial);
  
    console.log('Manufacturer:', manufacturer);
    console.log('Product:', product);
    console.log('Serial Number:', serialNumber);
  
    device.close();
  };

  listDirectories = async (directory: string): Promise<void> => {
    try {
      const files = await fs.promises.readdir(directory);
  
      // Filter only directories
      const directories = await Promise.all(
        files.map(async file => {
          const filePath = path.join(directory, file);
          const fileStats = await fs.promises.stat(filePath);
  
          if (fileStats.isDirectory()) {
            return file;
          }
          return null;
        })
      );
  
      // Filter out null values (non-directories)
      const actualDirectories = directories.filter(dir => dir !== null);
  
      console.log(`Directories in ${directory}:`);
      console.log(actualDirectories);
    } catch (error) {
      console.error(`Error listing directories: ${error}`);
    }
  };

  findDirectory = async (directory: string, targetName: string): Promise<string | null> => {
    try {
      const files = await fs.promises.readdir(directory);
  
      for (const file of files) {
        const filePath = path.join(directory, file);
        const fileStats = await fs.promises.stat(filePath);
  
        if (fileStats.isDirectory() && file === targetName) {
          return filePath;
        }
      }
  
      return null; // Target directory not found
    } catch (error) {
      console.error(`Error listing directories: ${error}`);
      return null;
    }
  };
}