import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken';

const SECRET: string = "KARVY_INPRO_SECRET";
const ACCESS_TOKEN_LIFETIME = '365d';

//  CREATE JWT 
export async function jwt_create(data: any, ACCESS_TOKEN_TIME?: string): Promise<string> {
    return await jwtSign(data, SECRET, { expiresIn: ACCESS_TOKEN_TIME || ACCESS_TOKEN_LIFETIME });
};

//  JWT VERIFY
export async function jwt_Verify(token: string): Promise<any> {
    try {
        return await jwtVerify(token, SECRET)
    } catch (err) {
        throw err;
    };
};