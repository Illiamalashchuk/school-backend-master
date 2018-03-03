import User from '../models/user';
import Image from '../models/image';
import Track from '../models/track';
import Album from '../models/album';
import Tracklist from '../models/tracklist';
import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';

@controller('/test') 
export default class TestCtrl extends BaseCtrl {
    
    @get('') // tracklist get
    async getList(ctx) {
        try {
            const items = await Tracklist.find().lean('tracklist');

            ctx.ok(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }
    // @get('') // user get
    // async getList2(ctx) {
    //     try {
    //         const items = await User.find().lean('names');

    //         ctx.ok(items);
    //     } catch (err) {
    //         ctx.throw(HttpStatus.BAD_REQUEST, err.message);
    //     }
    // }
    @post('') // user post
    async createItem(ctx) {
        // empty
        const itm = new Tracklist(ctx.request.body);
        await itm.save();

        ctx.ok({_id: itm._id});
    }

    @get('/:_id')
    async getItemById(ctx) {
        // empty
    }

    @put('/:_id')
    async updateItem(ctx) {
        // empty
    }

    @del('/:_id')
    async deleteItem(ctx) {
        // empty
    }
}
