import HttpStatus from 'http-status-codes';
import { controller, get, del } from 'koa-dec-router';
import BaseCtrl from './Base';
import GridFS from 'gridfs-stream';
import { pipe } from '../lib/files';
import mongoose from 'mongoose';


@controller('/files/music') 
export default class TestCtrl extends BaseCtrl {
  
  @get('/:_id') // get one object(image) by it`s id
    async getThumbnail(ctx) {
    const { res, params } = ctx;
    const gfs = GridFS(mongoose.connection.db, mongoose.mongo);
    
    if (await gfs.tryParseObjectId({ _id: params._id })) {
      return ctx.ok('err');
    }
    let sourceStream = gfs.createReadStream({ _id: params._id });
   
    ctx.status = HttpStatus.OK;
    ctx.body = await pipe(sourceStream, res, { end: false });
  }
  
  @del('/:_id')
  async deleteFSMusic(ctx) {
    const gfs = GridFS(mongoose.connection.db, mongoose.mongo);
    await gfs.remove({_id: ctx.params._id});
    return ctx.ok('err');
  }
}