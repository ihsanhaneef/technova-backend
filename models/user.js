import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export const user = new Schema(
  {
    email: { type: String, unique: true, required: true },
    passwordhash: { type: String, required: true },
    qualified: { type: Boolean, default: false },
    roundsCompleted: [
      {
        type: {
          level: { type: Number, required: true },
          round: { type: Number, required: true },
          score: { type: Number, required: true },
        },
      },
    ],
  },
  { timestamps: true }
);

user.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("passwordhash")) return next();
  try {
    if (user?.passwordhash) {
      const hash = await getHash(user.passwordhash);
      user.passwordhash = hash;
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

export const Users = model("users", user);
