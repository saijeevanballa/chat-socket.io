import * as joi from '@hapi/joi';

export const userRegistrationValidator = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(8).required()
});

export const userLoginValidator = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});


