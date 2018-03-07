import Album from '../models/album';
import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';

@controller('/album') 
export default class TestCtrl extends BaseCtrl {
    

    @get('') // get albums by user`s _id. As result you`ll get array of albums
    async getAlbumsByUserId(ctx) {
        try {
            const items = await Album.find(ctx.request.body);
            ctx.ok(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @post('') // post one new album
    async createAlbum(ctx) {
        // empty
        const itm = new Album(ctx.request.body);
        await itm.save();

        ctx.ok(itm);
    }

    @get('/:_id') // get one album by it`s id
    async getAlbumById(ctx) {
        try {
            let items = await Album.findOne(
                {
                    _id: ctx.params._id
                }
            );

            ctx.ok({_id: items._id});            
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }
    
    @put('/:_id') // update some properties of album
    async updateAlbum(ctx) {
        let items = await Album.findOneAndUpdate(
            {
                _id: ctx.params._id
            },
            {
                $push: ctx.request.body
            }
        ); 

        await items.save();
        ctx.ok(items);
    }

    @del('/:_id') // delete one object(album) from collection of albums
    async deleteAlbum(ctx) {
        let items = await Album.findOneAndRemove(
            {
                _id: ctx.params._id
            }, 
            ctx.request.body
        );

        ctx.ok(items);
    }

    @del('/:_id/del-one-from-album') // delete image from album
    async deleteImageFromAlbum(ctx) {
        let items = await Album.findOneAndUpdate(
            {
                _id: ctx.params._id
            }, 
            {
                $pull: ctx.request.body
            }
        ); // there you have to put (albumList: 'property which you want to delete')
        
        ctx.ok(items);
    }
}
