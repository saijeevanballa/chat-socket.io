import APIError from "../utils/custom-error";
import { userRegistrationValidator, userLoginValidator } from "./validation.joi";
import { userSchema } from "./model";
import { hashPassword, comparePassword } from "../utils/modules/bcrypt";
import { jwt_create } from "../utils/modules/jwt";

//  GE DETAILS
export async function userRegister(objBody) {
    try {
        const { error: bodyValidationError } = userRegistrationValidator.validate(objBody);
        if (bodyValidationError) throw new APIError(bodyValidationError.message, 404);
        let user = await userSchema.create({
            ...objBody,
            password: hashPassword(objBody.password)
        })
        return {
            token: await jwt_create({ id: user.id }),
            message: "User created successfully."
        }
    } catch (error) {
        throw error;
    }
}

export async function userLogin(objBody) {
    try {
        const { error: bodyValidationError } = userLoginValidator.validate(objBody);
        if (bodyValidationError) throw new APIError(bodyValidationError.message, 404);
        let user: any = await userSchema.find({ email: objBody.email });
        if (!user) throw new Error("invalid request");
        if (!comparePassword(objBody.password, user.password)) {
            throw new Error("invalid request");
        }
        return {
            token: await jwt_create({ id: user.id }),
            message: "User logged successfully."
        }
    } catch (error) {
        throw error;
    }
}

export async function userDetails(userId) {
    try {
        return await userSchema.findById(userId, { password: 0 })
    } catch (error) {
        throw error;
    }
}

export async function userUpdateSocketId(userId, socket_id) {
    try {
        await userSchema.findByIdAndUpdate(userId, { socket_id })
        return { message: "User socketId updated successfully." }
    } catch (error) {
        throw error;
    }
}