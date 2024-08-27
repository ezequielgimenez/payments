import type { NextApiRequest, NextApiResponse } from "next";
import { getMerchantOrder } from "lib/mercadopago";
import { Order } from "associations/associations";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id, topic } = req.query;
  if (topic == "merchant_order") {
    const order = await getMerchantOrder(id);
    if ((order.order_status = "paid")) {
      const id = order.external_reference;
      const myOrder = await Order.findOne({
        where: {
          id,
        },
      });
      await myOrder.update({
        status: "paid",
        date: new Date(),
      });
      //busca en la base de datos
      //manda el email
    }
    res.send({
      success: order.order_status,
    });
  }
}
