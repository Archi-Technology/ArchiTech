import { Application } from "express";
import { config } from "../config/config";
import { AuthService } from "../services/auth.service";
import jwt from 'jsonwebtoken';
import appPromise from "../app";
import UserModel from "../models/user.model";
import PostModel from "../models/post.model";
import CommentModel from "../models/comment.model";


let authService: AuthService;

var app: Application;

beforeAll(async () => {
  authService = new AuthService(); 
  app = await appPromise;
  await UserModel.deleteMany();
  await PostModel.deleteMany();
  await CommentModel.deleteMany();
   
});

afterAll(async () => {
    await Promise.all([
        PostModel.deleteMany(),
        UserModel.deleteMany(),
        CommentModel.deleteMany(),
    ])
});

describe("servies logic Tests", () => { 

    test("auth service refersh token with invalid token", async () => {
        try {
            const token = jwt.sign({ id: 'ckeck' }, config.REFRESH_SECRET, { expiresIn: config.JWT_EXPIRATION })
            await authService.refreshUserToken(token);
            expect(false).toEqual(true)
        } catch (error: any) {

            expect(error.message).toEqual('invalid token');
        }

    })


    test("auth service refersh token with unknown user", async () => {
        try {
            const token = jwt.sign({ _id: '6752ed0db0de8f1eebd9a540' }, config.REFRESH_SECRET, { expiresIn: config.JWT_EXPIRATION })
            await authService.refreshUserToken(token);
            expect(false).toEqual(true)
        } catch (error: any) {

            expect(error.message).toEqual('invalid request');
        }

    })

    test("auth service refersh unknown token user", async () => {
        try {
            const user = await authService.registerUser({password:'1', username:'1', email:'1'})
            const token = jwt.sign({ _id: user._id  }, config.REFRESH_SECRET, { expiresIn: config.JWT_EXPIRATION })
            await authService.refreshUserToken(token);
            expect(false).toEqual(true)
        } catch (error: any) {

            expect(error.message).toEqual('invalid request');
        }

    })
})