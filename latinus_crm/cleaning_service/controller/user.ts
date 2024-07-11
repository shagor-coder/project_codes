import { Request, Response } from "express";
import { AddressModel, UserModel } from "../models";

export const createUser = async (request: Request, response: Response) => {
  const { first_name, last_name, phone, email } = request.body;

  try {
    const user = await UserModel.findOne({ where: { email: email } });
    if (user) {
      return response.status(403).json({ message: "Adready added!" });
    }
    const newUser = await UserModel.create({
      firstName: first_name,
      lastName: last_name,
      phone: phone,
      email: email,
    });
    await newUser.save();
    response.status(200).json({ message: "Success!", data: newUser });
  } catch (error: any) {
    response.status(500).json({ error: error?.message as string });
  }
};

export const getUser = async (request: Request, response: Response) => {
  const email = request.query.email;

  try {
    const user = await UserModel.findOne({
      raw: true,
      where: { email: email as string },
      include: [
        {
          model: AddressModel,
          as: "address",
          attributes: ["address", "city", "state", "zip"],
        },
      ],
    });

    if (!user) {
      return response.status(404).json({ message: "No user found!" });
    }
    response.status(200).json({ message: "Success!", data: user });
  } catch (error: any) {
    response.status(500).json({ error: error?.message as string });
  }
};
