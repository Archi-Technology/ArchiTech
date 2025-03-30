import appPromise from '../app'
import mongoose from 'mongoose';
import request from "supertest";
import { Application } from 'express';
import UserModel from '../models/user.model';
import PostModel from '../models/post.model';
import CommentModel from '../models/comment.model';

var app: Application;

const prefix = 'auth';
const username = `${prefix}_test`;
const email = `${prefix}_test@mail.com`;
const userPassword = `${prefix}_123456`;
let accessToken: string;
let refreshToken: string;


beforeAll(async () => {
    app = await appPromise;
    await UserModel.deleteMany();
});

afterAll(async () => {
    await Promise.all([
        PostModel.deleteMany(),
        UserModel.deleteMany(),
        CommentModel.deleteMany(),
    ])
});


describe("Auth tests", () => {
    test("Add new user", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                'username': username,
                'email': email,
                'password': userPassword
            });
        expect(response.statusCode).toEqual(201);
    });

    test("missing fields for Add new user", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                'email': email,
                'password': userPassword
            });
        expect(response.statusCode).toEqual(400);
    });

    test("It should respond with error", async () => {
        const response = await request(app).get("/api/post/all");
        expect(response.statusCode).not.toEqual(200);
    });



    test("Login user", async () => {
        const response = await request(app).post("/api/auth/login").send({
            username: username,
            password: userPassword
        });

        expect(response.statusCode).toEqual(200);

        accessToken = response.body.accessToken;
        refreshToken = response.body.refreshToken;

        expect(accessToken).not.toEqual(null);
        expect(refreshToken).not.toEqual(null);
    });

    test("Login user with wrong password", async () => {
        const response = await request(app).post("/api/auth/login").send({
            username: username,
            password: `1${userPassword}`
        });

        expect(response.statusCode).toEqual(400);
    });

    test("Login user with wrong username", async () => {
        const response = await request(app).post("/api/auth/login").send({
            username: `${username}`
        });

        expect(response.statusCode).toEqual(400);
    });

    test("failed Login user", async () => {
        const response = await request(app).post("/api/auth/login").send({
            password: userPassword
        });

        expect(response.statusCode).toEqual(400);
    });

    test('should respond with tokens', async () => {
        const response = await request(app).post('/api/auth/refresh')
            .set({ authorization: 'Bearer ' + refreshToken });
        expect(response.statusCode).toEqual(200);

        const newAccessToken = response.body.accessToken;
        const newRefreshToken = response.body.refreshToken;

        expect(newAccessToken).not.toEqual(null);
        expect(newRefreshToken).not.toEqual(null);
    });

    test('missing refresh token for refresh', async () => {
        const response = await request(app).post('/api/auth/refresh');
        expect(response.statusCode).toEqual(401);
    });

    test('failed refresh token', async () => {
        const response = await request(app).post('/api/auth/refresh').set({ authorization: 'Bearer ' + 'refreshToken' });
        expect(response.statusCode).toEqual(400);
    });

    test('User logout', async () => {
        try {

            const response = await request(app).post('/api/auth/logout')
            .set({ authorization: 'Bearer ' + refreshToken });
            console.log("logout response:", response.body);
            expect(response.statusCode).toEqual(200);
        } catch (error) {
            console.log("Error while logging out:", error);
        }
        const userafterLogout = await UserModel.findOne({ username });
        expect(userafterLogout?.tokens).not.toContain(refreshToken);
    });

    test('misssing user token for User logout', async () => {
        const response = await request(app).post('/api/auth/logout');
        expect(response.statusCode).toEqual(401);
    });

    test('failed User logout', async () => {
        const response = await request(app).post('/api/auth/logout').set({ authorization: 'Bearer ' + `token` });
        expect(response.statusCode).toEqual(403);
    });


});




