import { NextApiRequest, NextApiResponse } from "next";
import { Advance } from "../../types";
import { Cerrado } from "../../utils/constants";
import { AdvanceModel } from "../schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // fetch the posts
    const advances = await AdvanceModel.find({ contableAdvanceState: {$ne: Cerrado}})

    return res.status(200).json({
      message: "todas los anticipos",
      data: advances as Array<Advance>,
      success: true,
    });
  }