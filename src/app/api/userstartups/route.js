import { NextResponse } from "next/server";
import Users from "../../../models/user.model";
import Startups from "../../../models/startups.model";
import Database from "../../../lib/mongodb";
import Response from "../../../config/response";
import CustomError from "../../../config/error";
import Enum from "../../../config/enum";

export async function GET(req) {
  try {
    await Database;
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "Email is required this error userstartups get"
      );
    }

    const userStartups = await Users.aggregate([
      {
        $match: { email: email }, 
      },
      {
        $lookup: {
          from: "startups",
          localField: "_id",
          foreignField: "userRef",
          as: "Startups",
        },
      },
    ]);
 
    return NextResponse.json(
      Response.successResponse({ success: true, userStartups })
    );
  } catch (error) {
    return NextResponse.json(Response.errorResponse(error));
  }
}
