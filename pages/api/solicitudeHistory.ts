import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/middlewares/mongo";
import { SolicitudeModel } from "../../lib/mongo/schemas";
import { Solicitude } from "../../lib/types";
import { Aprobado } from "../../lib/utils/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const solicitudes = await SolicitudeModel.find({ imageTreasuryState: Aprobado});

  return res.status(200).json({
    message: "Todas las solicitudes",
    data: solicitudes as Array<Solicitude>,
    success: true,
  });
}
