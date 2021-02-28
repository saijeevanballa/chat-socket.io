import { createRoomValidator } from "./validation.joi";
import APIError from "../utils/custom-error";
import { roomSchema } from "./rooms-model";

export async function createRoom(objBody, userId) {
    try {
        const { error: bodyValidationError } = createRoomValidator.validate(objBody);
        if (bodyValidationError) throw new APIError(bodyValidationError.message, 404);
        return await roomSchema.create({ ...objBody, created_by: userId });
    } catch (error) {
        throw error
    }
}

export async function roomList(userId) {
    try {
        return await roomSchema.find({ userIds: { $in: userId }, is_delete: false });
    } catch (error) {
        throw error
    }
}