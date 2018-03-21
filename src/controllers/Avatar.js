import Avatar from '../models/avatar';
import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';
import { fileUploader } from '../middleware/new';

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
        const imageId = ctx.files[0]._id;
        items.img = imageId;
        items.user = ctx.params._id;
        await items.save();

        ctx.ok({_id: items._id});
    }
 
    // @get('/album/:_id') // get images by albums id
    // async getImagesByAlbumsId(ctx) {
    //     try {
    //         const items = await Image.find({album: ctx.params});
    //         ctx.ok(items);            
    //     } catch (err) {
    //         ctx.throw(HttpStatus.BAD_REQUEST, err.message);
    //     }
    // }
    

    
    
    @del('/:_id') 
    async deleteImage(ctx) {
        let items = await Avatar.findOneAndRemove(
            {
                _id: ctx.params._id
            }, 
            ctx.request.body
        );
        
        ctx.ok(items);
    }

    // @put('/:_id') // update some properties of image
    // async updateImage(ctx) {
    //     const items = await Image.findOneAndUpdate({_id: ctx.params._id}, {$push: ctx.request.body}); 
        
    //     await items.save();
    //     ctx.ok(items);
    // }
    
    
    // @del('/:_id/del-image-prop') // delete some from image object
    // async deleteImageProp(ctx) {
    //     let items = await Image.findOneAndUpdate(
    //         {
    //             _id: ctx.params._id
    //         },
    //         {
    //             $pull: ctx.request.body
    //         }
    //     ); // there you have to put ('some image property': 'property which you want to delete')
        
    //     ctx.ok(items);
    // }
    



    
    // @get('/:_id') // get one object(image) by it`s id
    // async getImageById(ctx) {
    //     try {
    //         let items = await Image.findOne({_id: ctx.params._id, user: ctx.params});
    
    //         ctx.ok(items);            
    //     } catch (err) {
    //         ctx.throw(HttpStatus.BAD_REQUEST, err.message);
    //     }
    // }
}
