import Track from '../models/track';
import HttpStatus from 'http-status-codes';
import { controller, get, post, del } from 'koa-dec-router';
import BaseCtrl from './Base';
import { fileUploader } from '../middleware/fileUploader';

@controller('/track') 
export default class TestCtrl extends BaseCtrl {
    
    @get('/:_id') // get all tracks by user`s _id. As result you`ll get array of user`s tracks 
    async getTracksByUserId(ctx) {
        try {
            const items = await Track.find({user: ctx.params._id});
            ctx.ok(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @post('/:_id', fileUploader) // post new track to collection of tracks
    async createTrack(ctx) {
        const items = new Track(ctx.request.body);
        items.name =  ctx.files[0].filename; // filename takes from "fileUploader"
        items.track = ctx.files[0]._id; // id of file from "fileUploader"
        items.user = ctx.params._id;
        await items.save();
        ctx.ok(items);
    }
  
    @del('/:_id') // delete one track from collection of tracks
    async deleteTrack(ctx) {
        let items = await Track.remove({_id: ctx.params._id});
        ctx.ok(items);
    }
}
