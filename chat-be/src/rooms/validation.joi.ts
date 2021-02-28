import * as joi from '@hapi/joi';

export const createRoomValidator = joi.object({
    name: joi.string().min(4).allow(null, ""),
    userIds: joi.array().min(2).required(),
});



