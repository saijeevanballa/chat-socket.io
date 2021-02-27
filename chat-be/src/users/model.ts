import { Schema, model } from "mongoose";

const schema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    socket_id: { type: String },
    is_online: { type: Boolean, default: true },
    is_delete: { type: Boolean, default: false }
}, { timestamps: true });

export const userSchema = model("users", schema); 