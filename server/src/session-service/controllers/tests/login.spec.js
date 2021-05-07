import { expect } from '@jest/globals';
import request from 'supertest';
import { redisInstance, redisKey } from '../../../shared/utils/redis.utils';
describe("login user",
()=>{
    test("it should cache a user's session and return token and user",(done)=>{
        const input = {
            email:"test@test",
            password:"1233456"
        };
        const output = {};
        request(app)
        .post("/user/login")
        .send(input)
        .then(
            (response)=>{                                                                
                expect(response.statusCode).toBe(200);                
                expect(response).toHaveProperty('id');
                expect(response).toHaveProperty('email');
                expect(response).toHaveProperty('username');
                expect(response).toHaveProperty('token');
                let cacheToken = redisInstance.get('session',redisKey(id));

                expect(cacheToken).toEqual(response.token);

                done();
            }
        )        

    })
})