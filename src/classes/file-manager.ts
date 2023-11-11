import * as fs from 'fs';


export class FileManager {
  constructor(private sourceDirectory: string, private destinationDirectory: string) {}

  public copyFile(source: string, destination: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.copyFile(source, destination, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }
}
