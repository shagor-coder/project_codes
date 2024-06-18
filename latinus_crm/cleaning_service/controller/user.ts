import { Request, Response } from "express";
import { UserModel } from "../models/User";

export const create_user = async (request: Request, response: Response) => {
  const { first_name, last_name, full_address, service_type, extra } =
    request.body;

  try {
    const new_user = await UserModel.create({
      firstName: first_name,
      lastName: last_name,
      fullAddress: full_address,
      service_type: service_type,
      extra: extra,
    });
    await new_user.save();
    response.status(200).json({ message: "Success!", data: new_user });
  } catch (error: any) {
    response.status(500).json({ error: error?.message as string });
  }
};
