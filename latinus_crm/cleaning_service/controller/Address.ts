import { Request, Response } from "express";
import { AddressModel } from "../models/Address";
import { UserModel } from "../models/User";

export const create_address = async (request: Request, response: Response) => {
  const { address, state, city, zip, email } = request.body;

  try {
    const is_user = await UserModel.findOne({ where: { email: email } });
    if (!is_user) {
      return response.status(404).json({ message: "User not found!" });
    }
    const new_address = await AddressModel.create({
      address: address,
      city: city,
      state: state,
      zip: zip,
      user_id: is_user.dataValues.id,
    });
    await new_address.save();
    response.status(200).json({ message: "Success!", data: new_address });
  } catch (error: any) {
    response.status(500).json({ error: error?.message as string });
  }
};
