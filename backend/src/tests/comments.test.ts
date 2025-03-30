import appPromise from '../app'
import mongoose from 'mongoose';
import request from "supertest";
import { Application } from 'express';
import UserModel from '../models/user.model';
import PostModel from '../models/post.model';
import CommentModel from '../models/comment.model';
import testComments from "./data/test.comments.json";
import fs from 'fs';
import path from 'path';

var app: Application;

const prefix = 'comments';
const username = `${prefix}_testUser`;
const userPassword = `${prefix}_123456`;
const email = `${prefix}_test@email.com`;
let postText = "test text"
let postImg = "img.png"
let commentId: string;
let updatedcommentText = "comment text"
let postId: string;
let newUserId: string;
let accessToken: string;

beforeAll(async () => {
    app = await appPromise;
    await UserModel.deleteMany();
    await PostModel.deleteMany();
    await CommentModel.deleteMany();
    const userResponse = await request(app)
        .post("/api/auth/register")
        .send({
            'username': username,
            'email': email,
            'password': userPassword
        });
    newUserId = userResponse.body._id;

    await loginUser();
    try {
        const filePath = path.resolve(__dirname, './data/ChatGPT_logo.png');
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const postResponse = await request(app)
            .post('/api/post/create')
            .set({ authorization: 'Bearer ' + accessToken })
            .field("text", postText)
            .attach("file", filePath);

        console.log("Response for create post:", postResponse.body);   
        postId = postResponse.body._id;
    } catch (error) {
        console.log("Error while creating post:", error);   
    }
});

const loginUser = async () => {
    const response = await request(app).post('/api/auth/login').send({
        username: username,
        password: userPassword,
    });
    accessToken = response.body.accessToken;
}

beforeEach(async () => {
    await loginUser();
});

afterAll(async () => {
    await Promise.all([
        PostModel.deleteMany(),
        UserModel.deleteMany(),
        CommentModel.deleteMany(),
    ])
});


describe("Comment Tests", () => {

    test("create a comment ", async () => {
        const response = await request(app)
            .post(`/api/comment/create`)
            .set({ authorization: 'Bearer ' + accessToken }).send({
                "postId": postId,
                "text": testComments[0].text
            });

        expect(response.statusCode).toEqual(200);
        expect(response.body.text).toEqual(testComments[0].text);
        commentId = response.body._id;
    });

    test("empty data for create a comment ", async () => {
        const response = await request(app)
            .post(`/api/comment/create`)
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toEqual(400);
    });

    test("get a comment ", async () => {
        const response = await request(app)
            .get(`/api/comment/${commentId}`)
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.text).toEqual(testComments[0].text);
    });

    test("no id provided while get a comment ", async () => {
        const response = await request(app)
            .get(`/api/comment/null`)
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toEqual(400);
    });

    test("get all post comments ", async () => {
        const response = await request(app)
            .get(`/api/comment/post/${postId}`)
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toEqual(1);
    });


    test("update a comment ", async () => {
        const response = await request(app)
            .put(`/api/comment/update`)
            .set({ authorization: 'Bearer ' + accessToken }).send({
                "id": commentId,
                "text": updatedcommentText
            });

        expect(response.statusCode).toEqual(200);
        expect(response.body.text).toEqual(updatedcommentText);
    });



    test("Delete a Comment", async () => {
        const response = await request(app)
            .delete(`/api/comment/${commentId}`)
            .set({ authorization: 'Bearer ' + accessToken }).send();
        expect(response.statusCode).toEqual(200);
        const comment = await CommentModel.findOne({ _id: commentId });
        expect(comment).toEqual(null);
    });

    test("Delete a Comment while no id provided", async () => {
        const response = await request(app)
            .delete(`/api/comment/null`)
            .set({ authorization: 'Bearer ' + accessToken }).send();
        expect(response.statusCode).toEqual(400);
    });
    

    test("get all post comments 2", async () => {
        const response = await request(app)
            .get(`/api/comment/post/${postId}`)
            .set({ authorization: 'Bearer ' + accessToken }).send();

        console.log("Response status code:", response.statusCode);
        console.log("Response body:", response.body);   
        console.log("Request post id:", postId);   
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toEqual(0);
    });


});

