import { jwt_Verify } from "./modules/jwt";
import APIError from "./custom-error";
import { userSchema } from "../users/model";

// USER AUTHENTICATION 
export default async function authenticate(req: any, res: any, next: any) {
    try {
        if (!req.headers.authorization) throw new Error("Missing Token.")
        let token: any = await jwt_Verify(req.headers.authorization.substring(7))
        if (!token) next(new APIError("Invalid Token", 400));
        const user: any = await userSchema.findOne({ _id: token.user }).exec();
        if (!user) next(new APIError("Invalid Action", 400));
        res.user = user;
        res.userId = user.id
        return next();
    } catch (err) {
        return next(new APIError('Unauthorized', 401));
    };
};

// USER AUTHENTICATION 
export async function authenticateWithToken(authorization) {
    try {
        let token: any = await jwt_Verify(authorization.substring(7))
        if (!token) throw new APIError("Invalid Token", 400);
        const user: any = await userSchema.findOne({ _id: token.user }).exec();
        if (!user) throw new APIError("Invalid Action", 400);
        return user;
    } catch (err) {
        throw err
    };
};