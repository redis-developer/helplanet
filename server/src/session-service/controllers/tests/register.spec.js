import { expect } from '@jest/globals';
import request from 'supertest';
import { redisInstance, redisKey } from '../../../shared/utils/redis.utils';
describe("register user",
()=>{
    test("it should register a user and start session and return token and user",(done)=>{
        const input = {
            email:"test@test",
            password:"1233456",
            username:"testname",
            status:1, //status active(1) or inactive(0)
            role:1 //role admin(0) reporter(1) collaborator(2)
        };
        const output = {};
        request(app)
        .post("/user/login")
        .send(input)
        .then(
            (response)=>{                                  
                //   TODO remove test user
                expect(response.statusCode).toBe(200);                
                expect(response).toHaveProperty('id');
                expect(response).toHaveProperty('email');
                expect(response).toHaveProperty('token');
                let cacheToken = redisInstance.get(redisKey('session',id));

                expect(cacheToken).toEqual(response.token);                
                done();
            }
        )        

    })
})