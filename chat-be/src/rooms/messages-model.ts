import { Schema, model, Types } from "mongoose";

const schema = new Schema({
    senderId: { type: Types.ObjectId, ref: "users" },
    roomId: { type: Types.ObjectId, ref: "rooms" },
    messag: { type: String, trim: true },
    is_Read: { type: Array },
    is_delete: { type: Array }
}, { timestamps: true });

export const messageSchema = model("messages", schema); 