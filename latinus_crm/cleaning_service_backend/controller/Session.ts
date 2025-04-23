import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

type RequestBody = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  totalPrice: string;
};

export const createSession = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { totalPrice, email, firstName, lastName } =
      request.body as RequestBody;

    //@ts-ignore
    const session = await stripe.checkout.sessions.create({
      success_url: process.env.SESSION_SUCCESS_URL as string,
      cancel_url: process.env.SESSION_CANCEL_URL as string,
      payment_method_types: ["alipay", "us_bank_account", "giropay"],
      mode: "payment",
      submit_type: "pay",
      customer_email: email,
      metadata: {
        firstName: firstName,
        lastName: lastName,
      },
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Cleaing Service",
              description:
                "We provide all types of cleaing services to customers",
            },
            unit_amount: parseInt(totalPrice, 10) * 100,
          },
          quantity: 1,
        },
      ],
    });

    response.status(200).json({
      message: "Payment Success!",
      data: { sessionId: session.id as string, url: session.url as string },
    });
  } catch (error: any) {
    response.status(500).json({ message: error.message as string });
  }
};
