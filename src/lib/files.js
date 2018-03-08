import path from 'path';
import GridFS from 'gridfs-stream';
import mongoose from 'mongoose';
import imageSize from 'image-size';

export function pipe(from, to, options) {
 return new Promise((resolve, reject) => {
   from.pipe(to, options);
   from.on('error', reject);
   from.on('end', resolve);
 });
}

export function getMimetype(filename) {
 switch (path.extname(filename)) {
   case '.jpeg':
   case '.jpg':
     return 'image/jpeg';
   case '.png':
     return 'image/png';
   case '.gif':
     return 'image/gif';
   default:
     return 'application/octet-stream';
 }
}

export function saveFileFromStream(fileStream, filename, mimeType) {
 const gfs = GridFS(mongoose.connection.db, mongoose.mongo);

 let buffer = Buffer.from([]);
 let length = 0;
 const options = {
   _id: mongoose.Types.ObjectId(),
   filename: filename,
   mode: 'w',
   content_type: mimeType,
   metadata: {
     dimensions: null
   }
 };

 return new Promise((resolve, reject) => {
   const writeStream = gfs.createWriteStream(options);
   writeStream.on('error', reject);

   fileStream.on('data', onStreamData);
   fileStream.on('error', reject);

   fileStream.pipe(writeStream);
   return writeStream.on('close', onStreamEnd);

   function onStreamEnd() {
     resolve(options);
   }
 });

 function onStreamData(data) {
   if (options.metadata.dimensions) {
     return;
   }
   length += data.length;
   buffer = Buffer.concat([buffer, data], length);
   try {
     options.metadata.dimensions = imageSize(buffer);
   } catch (e) {}
 }
}