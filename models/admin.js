import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export const admin = new Schema(
  {
    email: { type: String, unique: true, required: true },
    passwordhash: { type: String, required: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

admin.pre("save", async function (next) {
  const admin = this;
  if (!admin.isModified("passwordhash")) return next();
  try {
    if (admin?.passwordhash) {
      const hash = await getHash(admin.passwordhash);
      admin.passwordhash = hash;
    }
    next();
  } catch (error) {
    return next(error);
  }
});

export async function getHash(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export const Admins = model("admins", admin);
