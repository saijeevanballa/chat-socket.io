import { Router, NextFunction, Request, Response } from "express";
import APIError from "../utils/custom-error";
import { Types } from "mongoose";
import authenticate from "../utils/authenticate";
import { userRegister, userLogin, userDetails } from "./module";
import APIResponse from "../utils/custom-response";

const router = Router();

// user id validator
router.param("userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!Types.ObjectId.isValid(req.params.userId)) throw new Error("Invalid URI, please try again.")
        next();
    } catch (err) {
        next(new APIError(err.message, 400));
    };
});

// user registration
router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let resp = await userRegister(req.body)
        res.status(200).send(new APIResponse(resp))
    } catch (err) {
        next(new APIError(err.message));
    };
});

// user login
router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let resp = await userLogin(req.body)
        res.status(200).send(new APIResponse(resp))
    } catch (err) {
        next(new APIError(err.message));
    };
});

// user details
router.get("/details/:userId", authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
        let resp: any = await userDetails((res as any).userId)
        res.status(200).send(new APIResponse(resp))
    } catch (err) {
        next(new APIError(err.message));
    };
});

export = router;