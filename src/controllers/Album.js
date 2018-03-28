import Album from '../models/album';
import HttpStatus from 'http-status-codes';
import { controller, get, post, del } from 'koa-dec-router';
import BaseCtrl from './Base';

@controller('/album') 
export default class TestCtrl extends BaseCtrl {
    
    @get('/:_id') // get albums by user`s _id. As result you`ll get array of albums
    async getAlbumsByUserId(ctx) {
        try {
            const items = await Album.find({user: ctx.params._id});
            ctx.ok(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @post('/:_id') // post one new album
    async createAlbum(ctx) {
        const items = new Album(ctx.request.body);
        items.user = ctx.params._id;
        items.name = ctx.request.body.name || 'New album';
        await items.save();
        ctx.ok(items);
    }

    @del('/:_id') // delete one album from collection of albums
    async deleteAlbum(ctx) {
        const items = await Album.findOneAndRemove({_id: ctx.params._id});
        ctx.ok(items);
    }
}
