import Avatar from '../models/avatar';
import HttpStatus from 'http-status-codes';
import { controller, get, post, del } from 'koa-dec-router';
import BaseCtrl from './Base';
import { fileUploader } from '../middleware/fileUploader';

@controller('/avatar') 
export default class TestCtrl extends BaseCtrl {

    @get('/:_id') // get all images by user`s _id and image`s _id. As result you`ll get array of user`s images 
    async getImagesByUserId(ctx) {
        try {
            const items = await Avatar.find({user: ctx.params._id});
            ctx.ok(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @post('/:_id', fileUploader) // post new image
    async insertImageToCollection(ctx) {
        const items = new Avatar(ctx.request.body);
        items.img = ctx.files[0]._id;
        items.user = ctx.params._id;
        await items.save();

        ctx.ok({_id: items._id});
    }

    @del('/:_id') 
    async deleteImage(ctx) {
        const items = await Avatar.findOneAndRemove({_id: ctx.params._id});
        
        ctx.ok(items);
    }
}
