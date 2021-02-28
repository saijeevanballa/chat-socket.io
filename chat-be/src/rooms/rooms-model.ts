import { Schema, model, Types } from "mongoose";

const schema = new Schema({
    name: { type: String, trim: true },
    userIds: { type: Array },
    created_by: { type: Types.ObjectId, ref: "users" },
    is_delete: { type: Boolean, default: false }
}, { timestamps: true });

export const roomSchema = model("rooms", schema); 