import Tracklist from '../models/tracklist';
import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';

@controller('/tracklist') 
export default class TestCtrl extends BaseCtrl {
    

    @get('') // get all Tracklists
    async getListOfTracklists(ctx) {
        try {
            const items = await Tracklist.find();
            ctx.ok(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @post('') // post one new tracklist
    async createTracklist(ctx) {
        // empty
        const itm = new Tracklist(ctx.request.body);
        await itm.save();

        ctx.ok(itm);
    }

    @get('/:_id') // get one object(tracklist) by it`s id
    async getTracklistById(ctx) {
        try {
            let items = await Tracklist.findOne({_id: ctx.params._id});

            ctx.ok(items);            
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @put('/:_id') // update some properties of tracklist
    async updateTracklist(ctx) {
        let items = await Tracklist.findOneAndUpdate({_id: ctx.params._id}, {$push: ctx.request.body}); // here you can change the name of some tracklist or insert new track in 'Tracklistlist'

        items.save();
        ctx.ok(items);
    }
    
    @del('/:_id') // delete one object(Tracklist) from collection of Tracklists
    async deleteTracklist(ctx) {
        let items = await Tracklist.findOneAndRemove({_id: ctx.params._id}, ctx.request.body);

        ctx.ok(items);
    }

    @del('/:_id/del-one-from-list') // delete track from Tracklist
    async deleteTrackFromTracklist(ctx) {
        let items = await Tracklist.findOneAndUpdate({_id: ctx.params._id}, { $pull: ctx.request.body }); // there you have to put (TracklistList: 'property which you want to delete')
        ctx.ok(items);
    }
}
