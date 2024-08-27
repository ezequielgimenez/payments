import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "models/user";
import { Auth } from "models/auth";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const findUser = await Auth.create({
      email: "ezequielezequiel9@gmail.com",
    });
    if (findUser) {
      res.send("Salio todo ok");
    } else {
      res.send("No encontro");
    }
  } catch (error) {
    res.send("Error no encontro user");
  }

  res.send({});
}
