import { NextApiRequest, NextApiResponse } from "next";
import { Solicitude } from "../../types";
import { Aprobado } from "../../utils/constants";
import { SolicitudeModel } from "../schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // fetch the posts
    const solicitudes = await SolicitudeModel.find({imageTreasuryState: {$ne: Aprobado}})

    return res.status(200).json({
      message: "todas las solicitudes",
      data: solicitudes as Array<Solicitude>,
      success: true,
    });
  }