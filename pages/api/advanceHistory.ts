import {NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/middlewares/mongo";
import { AdvanceModel } from "../../lib/mongo/schemas";
import { Advance } from "../../lib/types";
import { Cerrado } from "../../lib/utils/constants";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();

    const advances = await AdvanceModel.find({ contableAdvanceState: Cerrado }); 

    return res.status(200).json({
        message: "Todos los anticipos",
        data: advances as Array<Advance>,
        success: true,
    })
}