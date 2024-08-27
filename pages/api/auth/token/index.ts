import type { NextApiRequest, NextApiResponse } from "next";
import { generateToken } from "lib/tokenGenerate";
import { Auth } from "models/auth";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, code } = req.body;
  try {
    const userAuth = await Auth.findOne({
      where: {
        email,
        code,
      },
    });
    if (userAuth) {
      const data = userAuth.toJSON();
      const expireDate = userAuth.get("expire");
      const nowDate = new Date();
      //si esta vencido
      if (expireDate < nowDate) {
        res.send({
          success: false,
          message: "Codigo expirado",
        });
      } else {
        const token = generateToken(data);
        res.send({
          token,
        });
      }
    } else {
      res.send({
        success: false,
        message: "Codigo o email incorrecto",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error,
    });
  }
}
