console.log('Hello world, I am back!')

// __dirname Global Variable
console.log(__dirname);

// __filename Global Variable
console.log(__filename);


const os = require('os');

// os.uptime()
const systemUptime = os.uptime();

// os.userInfo()
const userInfo = os.userInfo();

// We will store some other information about my WindowsOS in this object:
const otherInfo = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
}

// Let's Check The Results:
console.log(systemUptime);
console.log(userInfo);
console.log(otherInfo);


// Import 'path' module using the 'require()' method:
const path = require('path')

// Assigning a path to the myPath variable
const myPath = 'Desktop/index.ts'

const pathInfo = {
    fileName: path.basename(myPath),
    folderName: path.dirname(myPath),
    fileExtension: path.extname(myPath),
    absoluteOrNot: path.isAbsolute(myPath),
    detailInfo: path.parse(myPath),
}

// Let's See The Results:
console.log(pathInfo);



console.log(path.resolve('grandParentFolder', 'parentFolder', 'child.txt'));


// Import fs module
const fs = require('fs');

// Present Working Directory: C:\Users\hugoh\Documents\projects_personal\media-file-sender
// Making a new directory called ./myFolder:

fs.mkdir('./myFolder', (err: any) => {
    if(err){
    	console.log(err);
    } else{
    	console.log('Folder Created Successfully');
    }
})

const data = "Hi,this is newFile.txt";

fs.writeFile('./myFolder/myFile.txt', data, {flag: 'a'}, (err: any) => {
    if(err){
        console.log(err);
        return;
    } else {
    	console.log('Writen to file successfully!');
    }
})