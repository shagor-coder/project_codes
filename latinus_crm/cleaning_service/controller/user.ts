import { Request, Response } from "express";
import { UserModel } from "../models/User";

export const create_user = async (request: Request, response: Response) => {
  const { first_name, last_name, phone, email } = request.body;

  try {
    const is_user = await UserModel.findOne({ where: { email: email } });
    if (is_user) {
      return response.status(403).json({ message: "Adready added!" });
    }
    const new_user = await UserModel.create({
      firstName: first_name,
      lastName: last_name,
      phone: phone,
      email: email,
    });
    await new_user.save();
    response.status(200).json({ message: "Success!", data: new_user });
  } catch (error: any) {
    response.status(500).json({ error: error?.message as string });
  }
};
