import { Request, Response } from "express";
import { AddressModel } from "../models/Address";
import { UserModel } from "../models";

interface userAttributes {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const addAddress = async (request: Request, response: Response) => {
  const { address, state, city, zip, email } = request.body;

  try {
    const user = (await UserModel.findOne({
      raw: true,
      where: { email: email },
    })) as userAttributes | null;

    if (!user) {
      return response.status(404).json({ message: "User not found!" });
    }

    const addressPresent = await AddressModel.findOne({
      raw: true,
      where: { userId: user.id },
    });

    if (addressPresent) {
      return response.status(401).json({ message: "Address already added!!" });
    }

    const newAddress = await AddressModel.create({
      address: address,
      city: city,
      state: state,
      zip: zip,
      userId: user.id,
    });

    await newAddress.save();
    response.status(200).json({ message: "Success!", data: newAddress });
  } catch (error: any) {
    response.status(500).json({ error: error?.message as string });
  }
};
