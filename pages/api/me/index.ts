import type { NextApiRequest, NextApiResponse } from "next";
import { middleware } from "controllers/middleware";
import method from "micro-method-router";

function authMe(req: NextApiRequest, res: NextApiResponse, data) {
  res.send({
    success: true,
    data,
    message: "data del usuario",
  });
}

export default middleware(authMe);
