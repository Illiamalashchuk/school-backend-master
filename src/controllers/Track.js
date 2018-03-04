import Track from '../models/track';
import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';

@controller('/track') 
export default class TestCtrl extends BaseCtrl {
    

    @get('') // get all tracks - array of tracks
    async getListOfTracks(ctx) {
        try {
            const items = await Track.find();

            ctx.ok(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @post('') // post new track to collection of tracks
    async createTrack(ctx) {
        const itm = new Track(ctx.request.body);
        await itm.save();

        ctx.ok(itm);
    }

    @get('/:_id') // get one object(track) by it`s id
    async getTrackById(ctx) {
        try {
            let items = await Track.findOne({_id: ctx.params._id});

            ctx.ok(items);            
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @put('/:_id') // update some properties of track
    async updateTrack(ctx) {
        let items = await Track.findOneAndUpdate({_id: ctx.params._id}, {$push: ctx.request.body}); 

        await items.save();
        ctx.ok(items);
    }
    
    @del('/:_id') // delete one object(track) from collection of tracks
    async deleteTrack(ctx) {
        let items = await Track.findOneAndRemove({_id: ctx.params._id}, ctx.request.body);

        ctx.ok(items);
    }

    @del('/:_id/del-track-prop') // delete track from Tracklist
    async deleteTrackProp(ctx) {
        let items = await Track.findOneAndUpdate({_id: ctx.params._id}, { $pull: ctx.request.body }); // there you have to put (trackList: 'property which you want to delete')
        ctx.ok(items);
    }
}
