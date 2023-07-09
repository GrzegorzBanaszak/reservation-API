import { Request, Response } from "express";

export const getAll = async (req: Request, res: Response): Promise<void> => {
  res.json({ name: "test" });
};
