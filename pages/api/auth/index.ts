import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "lib/firestore";
import { Auth } from "models/auth";
import { User } from "models/user";
import { generateCode } from "lib/generateCode";
import { generateDateExpire } from "lib/generateExpires";
import { sendEmail } from "lib/sendEmail";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const email = req.body.email;
  try {
    const [myUser, userCreated] = await User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        email,
      },
    });
    if (userCreated) {
      await Auth.findOrCreate({
        where: {
          userId: myUser.get("id"),
        },
      });
    }
    if (myUser) {
      const expire = generateDateExpire();
      const code = generateCode();
      await Auth.update(
        {
          code,
          expire,
        },
        {
          where: {
            email,
          },
        }
      );
      await sendEmail(email, code);
    }
    res.send({
      success: true,
      message: "Codigo enviado al email",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error,
    });
  }
}
