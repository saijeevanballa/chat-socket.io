import { Router, NextFunction, Request, Response } from "express";
import APIError from "../utils/custom-error";
import authenticate from "../utils/authenticate";
import APIResponse from "../utils/custom-response";
import { createRoom, roomList } from "./module";

const router = Router();

// user registration
router.post("/create", authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
        let resp = await createRoom(req.body, (res as any).userId)
        res.status(200).send(new APIResponse(resp))
    } catch (err) {
        next(new APIError(err.message));
    };
});

// user login
router.get("/list", authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
        let resp = await roomList((res as any).userId)
        res.status(200).send(new APIResponse(resp))
    } catch (err) {
        next(new APIError(err.message));
    };
});

export = router;