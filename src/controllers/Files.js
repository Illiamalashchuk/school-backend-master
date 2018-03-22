import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';
import GridFS from 'gridfs-stream';
import { pipe } from '../lib/files';
import mongoose from 'mongoose';
import sharp from 'sharp';

@controller('/files') 
export default class TestCtrl extends BaseCtrl {
  
  @get('/:_id') // get one object(image) by it`s id
    async getThumbnail(ctx) {
    const { res, params } = ctx;
    const gfs = GridFS(mongoose.connection.db, mongoose.mongo);
    
    if (await gfs.tryParseObjectId({ _id: params._id })) {
      return ctx.ok('err');
    }
    let sourceStream = gfs.createReadStream({ _id: params._id });
    
    console.log(sourceStream)
    let transformer = sharp().resize(320, 180) 
    
    sourceStream = sourceStream.pipe(transformer)
  

    ctx.status = HttpStatus.OK;
    ctx.body = await pipe(sourceStream, res, { end: false });
  }
}
