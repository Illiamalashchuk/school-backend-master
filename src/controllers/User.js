import User from '../models/user';
import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';

@controller('/user') 
export default class TestCtrl extends BaseCtrl {
    
    @get('') // get all users - array of users
    async getList(ctx) {
        try {
            const items = await User.find();
            ctx.ok(items);
            console.log(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @post('') // post new user to collection of users
    async createItem(ctx) {
        const itm = new User(ctx.request.body);
        await itm.save();

        ctx.ok(itm);
    }

    @get('/:_id') // get one object(user) by it`s id
    async getItemById(ctx) {
        try {
            let items = await User.findOne({_id: ctx.params._id});

            ctx.ok(items);            
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    // @put('/:_id') // update some properties of users
    // async updateItem(ctx) {
    //     let items = await User.findOneAndUpdate({_id: ctx.params._id}, ctx.request.body);

    //     items.save();
    //     ctx.ok(items);
    //     console.log(ctx.request.body)
    // }
    


    @put('/:_id') // update some properties of users
    async updateItem(ctx) {
        let items = await User.update({_id: ctx.params._id.userImages}, {$addToSet: ctx.request.body});
      //  items.save();
        ctx.ok(items);
        // console.log(ctx.request.body)
    }



    @del('/:_id') // delete one object(user) from collection of users
    async deleteItem(ctx) {
        let items = await User.findOneAndRemove({_id: ctx.params._id}, ctx.request.body);
        ctx.ok(items);
    }
}
