import Image from '../models/image';
import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';


@controller('/image') 
export default class TestCtrl extends BaseCtrl {

    @get('') // get all images by user`s _id. As result you`ll get array of images
    async getImagesByUserId(ctx) {
        try {
            const items = await Image.find(ctx.request.body);

            ctx.ok(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @post('') // post new image to collection of users
    async insertImageToCollection(ctx) {
        const itm = new Image(ctx.request.body);
        await itm.save();

        ctx.ok({_id: itm._id});
    }

    @get('/:_id') // get one object(image) by it`s id
    async getImageById(ctx) {
        try {
            let items = await Image.findOne(
                {
                    _id: ctx.params._id
                }
            );

            ctx.ok(items);            
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @put('/:_id') // update some properties of image
    async updateImage(ctx) {
        let items = await Image.findOneAndUpdate(
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
    
    @del('/:_id') // delete one object(image) from collection of images
    async deleteImage(ctx) {
        let items = await Image.findOneAndRemove(
            {
                _id: ctx.params._id
            }, 
            ctx.request.body
        );

        ctx.ok(items);
    }

    @del('/:_id/del-image-prop') // delete some from image object
    async deleteImageProp(ctx) {
        let items = await Image.findOneAndUpdate(
            {
                _id: ctx.params._id
            },
            {
                $pull: ctx.request.body
            }
        ); // there you have to put ('some image property': 'property which you want to delete')
        
        ctx.ok(items);
    }

}
