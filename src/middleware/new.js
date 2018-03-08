import parse from 'co-busboy';
import { saveFileFromStream } from '../lib/files';

export async function fileUploader(ctx, next) {
 if (ctx.method !== 'POST') {
   return next();
 }
 const parts = parse(ctx);
 const files = [];

 let part;
 while ((part = await parts())) {
   if (!part.length) {
     files.push(await saveFileFromStream(part, part.filename, part.mimeType));
   }
 }
 ctx.files = files;
 next();
}

