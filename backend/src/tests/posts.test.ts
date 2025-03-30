import { Application } from 'express';
import request from "supertest";
import appPromise from '../app';
import PostModel from '../models/post.model';
import UserModel from '../models/user.model';
import fs from 'fs';
import path from 'path';

var app: Application;

const prefix = 'post';
const username = `${prefix}_testPostsUser`;
const userPassword = `${prefix}_123456`;
const email = `${prefix}_test@email.com`;
let postText = "test text"
let postImg = "img.png"
let postUpdatedImg = "img2.png"
let newPostSender: string;
let newPostId: string;
let accessToken: string;

beforeAll(async () => {
    app = await appPromise;
    await UserModel.deleteMany();
    await PostModel.deleteMany();
    const response = await request(app)
        .post("/api/auth/register")
        .send({
            'username': username,
            'email': email,
            'password': userPassword
        });
    newPostSender = response.body._id;

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
        newPostId = postResponse.body._id;
    } catch (error) {
        console.log("Error while creating post:", error);
    }
    console.log("newPostId before all logic:", newPostId);
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
        PostModel.deleteMany()
    ])
});

describe("Posts Tests", () => {

    test("add new post", async () => {
        // This test is now redundant as the logic is moved to beforeAll
        expect(newPostId).toBeDefined();
    });

    test("Posts test get all", async () => {
        const response = await request(app)
            .get('/api/post/all')
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1); // Updated to reflect the created post
    });

    test("Like a post ", async () => {
        const response = await request(app)
            .post(`/api/post/${newPostId}/like`)
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.likes).toContain(newPostSender);
    });

    test("Unlike a post ", async () => {
        const response = await request(app)
            .post(`/api/post/${newPostId}/unlike`)
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.likes).not.toContain(newPostSender);
    });

    test("update a post ", async () => {
        const filePath = path.resolve(__dirname, './data/ChatGPT_logo.png');
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        let response
        try {

             response = await request(app)
            .put(`/api/post/update`)
            .set({ authorization: 'Bearer ' + accessToken })
            .field("id", newPostId).field("text", postText)
            .attach("file", filePath);
        } catch (error) { 
            console.log("Error while updating post:", error)
        }
        console.log("Response for update post:", response?.body);
        expect(response?.statusCode).toEqual(200);
    });

    test("Delete a post ", async () => {
        const response = await request(app)
            .delete(`/api/post/${newPostId}`)
            .set({ authorization: 'Bearer ' + accessToken }).send();
        expect(response.statusCode).toEqual(200);
    });

    test("Posts test get all 3", async () => {
        const response = await request(app)
            .get('/api/post/all')
            .set({ authorization: 'Bearer ' + accessToken }).send();

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

});

