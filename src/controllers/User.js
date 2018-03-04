import User from '../models/user';
import HttpStatus from 'http-status-codes';
import { controller, get, post, put, del } from 'koa-dec-router';
import BaseCtrl from './Base';

@controller('/user') 
export default class TestCtrl extends BaseCtrl {
    
    @get('') // get all users - array of users
    async getListOfUsers(ctx) {
        try {
            const items = await User.find();

            ctx.ok(items);
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @post('') // post new User to collection of users
    async createUser(ctx) {
        const itm = new User(ctx.request.body);
        await itm.save();

        ctx.ok(itm);
    }

    @get('/:_id') // get one object(User) by it`s id
    async getUserById(ctx) {
        try {
            let items = await User.findOne(
                {
                    _id: ctx.params._id
                }
            );

            ctx.ok(items);            
        } catch (err) {
            ctx.throw(HttpStatus.BAD_REQUEST, err.message);
        }
    }

    @put('/:_id') // update some properties of User
    async updateUser(ctx) {
        let items = await User.findOneAndUpdate(
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
    
    @del('/:_id') // delete one object(User) from collection of Users
    async deleteUser(ctx) {
        let items = await User.findOneAndRemove(
            {
                _id: ctx.params._id
            },
            ctx.request.body
        );

        ctx.ok(items);
    }

    @del('/:_id/del-user-prop') // delete UserTag from User object
    async deleteUserProp(ctx) {
        let items = await User.findOneAndUpdate(
            {
                _id: ctx.params._id
            }, 
            {
                $pull: ctx.request.body
            }
        ); // there you have to put ('some user`s keys': 'property which you want to delete')
        ctx.ok(items);
    }
}
