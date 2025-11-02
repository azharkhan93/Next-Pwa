import mongoose from "mongoose";
import { Role, RoleValues } from "./Role";


export type UserDocument = mongoose.Document & {
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
  };
  

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: RoleValues,
      default: Role.SUPER_ADMIN,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


export const User =
  mongoose.models.User || mongoose.model("User", UserSchema);


