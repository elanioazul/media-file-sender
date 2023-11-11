import * as usb from 'usb';
export interface UsbObserver {
    onUsbAttach(device: usb.Device): void;
    onUsbDetach(device: usb.Device): void;
}