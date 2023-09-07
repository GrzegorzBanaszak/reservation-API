import { CookieOptions } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default class Security {
  constructor() {}
  getCookisConfig(): CookieOptions {
    return {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    };
  }

  generateToken(id: string) {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async isPasswordCurrect(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}
