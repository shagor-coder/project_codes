import { Request, Response } from "express";
import { ServicesModel, UserModel } from "../models";

interface servicesAttributes {
  id?: string;
  cleanType: string;
  additionalRoom: string;
  additionalBathroom: string;
  userId?: string;
}

export const addServices = async (request: Request, response: Response) => {
  const { cleanType, additionalRoom, additionalBathroom, email } = request.body;

  try {
    const user = (await UserModel.findOne({
      raw: true,
      where: { email: email },
    })) as servicesAttributes | null;

    if (!user) {
      return response.status(404).json({ message: "User not found!" });
    }

    const services = await ServicesModel.create({
      additionalBathroom: additionalBathroom,
      additionalRoom: additionalRoom,
      cleanType: cleanType,
      userId: user.id,
    });

    await services.save();
    response.status(200).json({ message: "Success!", data: services });
  } catch (error: any) {
    response.status(500).json({ error: error?.message as string });
  }
};
