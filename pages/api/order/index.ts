import type { NextApiRequest, NextApiResponse } from "next";
import { createPreference } from "lib/mercadopago";
import { middleware } from "controllers/middleware";
import { Order } from "associations/associations";
import methods from "micro-method-router";

const products = [
  {
    id: 123,
  },
  {
    id: 234,
  },
];

async function createOrder(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  const { productId } = req.query as any;
  const data = (req as any).userData;
  const prod = products.find((i) => {
    return i.id == productId;
  });
  if (!prod) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  try {
    const myOrder = await Order.create({
      userId: data.id,
      product_id: productId,
      status: "pending",
      date: new Date(),
    });

    const preference = await createPreference({
      ...body,
      external_reference: "abcd123456789",
      notification_url:
        "https://webhook.site/03a3179d-fb9f-4737-ad6c-bce019d66ecc",
    });
    res.send({
      success: true,
      url: preference.init_point,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error + " Ocurrio un error al crear orden",
    });
  }
}

const handleOrder = methods({
  post: (req: NextApiRequest, res: NextApiResponse) => createOrder(req, res),
});

export default middleware(handleOrder);
