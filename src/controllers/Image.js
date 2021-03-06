import Image from '../models/image';
import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';
import { fileUploader } from '../middleware/fileUploader';

@controller('/image') 
export default class TestCtrl extends BaseCtrl {

    @get('/:_id') // get all images by user`s _id. As result you`ll get array of user`s images 
    async getImagesByUserId(ctx) {
        try {
            const items = await Image.find({user: ctx.params._id});
            ctx.ok(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @post('/:_id', fileUploader) // post new image
    async insertImageToCollection(ctx) {
        try {
            const items = new Image(ctx.request.body);
            items.img =  ctx.files[0]._id;
            items.user = ctx.params._id;
            await items.save();
            
            ctx.ok(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }
 
    @get('/album/:_id') // get images by albums._id. As result you get array of images
    async getImagesByAlbumsId(ctx) {
        try {
            const items = await Image.find({album: ctx.params});
            ctx.ok(items);            
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }
    @get('/non-album/:_id') // get images which weren`t inserted to some of albums
    async getImagesForInsertingInAlbum(ctx) {
        try {
            const items = await Image.find({user: ctx.params._id, album: null});
            ctx.ok(items);            
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @put('/:_id') // update some properties of image
    async updateImage(ctx) {
        const items = await Image.findOneAndUpdate({_id: ctx.params._id}, {$set: ctx.request.body}); 
        
        await items.save();
        ctx.ok(items);
    }
    
    @del('/:_id') // delete one image from collection of images
    async deleteImage(ctx) {
        let items = await Image.remove({_id: ctx.params._id});
        
        ctx.ok(items);
    }
    

    @put('/del-all-images/:_id') // delete image from album
    async deleteManyImagesProp(ctx) { 
        let items = await Image.update({album: ctx.params._id}, {$unset: {album: ctx.params._id}}, {multi: true}); 
        
        ctx.ok(items);
    }

    @put('/del-one-images/:_id') // delete image from album
    async deleteOneImageProp(ctx) { 
        let items = await Image.update({_id: ctx.params._id}, {$unset: {album: ctx.request.body}}); 
        
        ctx.ok(items);
    }
}
