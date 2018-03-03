import Image from '../models/image';
import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';

@controller('/image') 
export default class TestCtrl extends BaseCtrl {
    

    @get('') // get all images - array of images
    async getListOfImages(ctx) {
        try {
            const items = await Image.find();

            ctx.ok(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @post('') // post new image to collection of users
    async createImage(ctx) {
        const itm = new Image(ctx.request.body);
        await itm.save();

        ctx.ok(itm);
    }

    @get('/:_id') // get one object(image) by it`s id
    async getImageById(ctx) {
        try {
            let items = await Image.findOne({_id: ctx.params._id});

            ctx.ok(items);            
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @put('/:_id') // update some properties of image
    async updateImage(ctx) {
        let items = await Image.findOneAndUpdate({_id: ctx.params._id}, {$push: ctx.request.body}); 

        await items.save();
        ctx.ok(items);
    }
    
    @del('/:_id') // delete one object(image) from collection of images
    async deleteImage(ctx) {
        let items = await Image.findOneAndRemove({_id: ctx.params._id}, ctx.request.body);

        ctx.ok(items);
    }

    @del('/:_id/del-tag') // delete imageTag from image object
    async deleteTag(ctx) {
        let items = await Image.findOneAndUpdate({_id: ctx.params._id}, { $pull: ctx.request.body }); // there you have to put (imageTag: 'property which you want to delete')
        ctx.ok(items);
    }

    @del('/:_id/del-description') // delete description from image object
    async deleteDescription(ctx) {
        let items = await Image.findOneAndUpdate({_id: ctx.params._id}, {$pop: ctx.request.body}); // there you have to put (image Description: 'empty field')
        ctx.ok(items);
    }
    @del('/:_id/del-img-fr-album') // delete description from image object
    async deleteImageFromAlbum(ctx) {
        let items = await Image.findOneAndUpdate({_id: ctx.params._id}, {$pull: ctx.request.body}); // there you have to put (image Description: 'empty field')
        ctx.ok(items);
    }
}
