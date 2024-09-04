import { NextResponse } from "next/server";
import Database from "../../../lib/mongodb";
import StartupsClicks from "../../../models/startupsClick.model";
import Response from "../../../config/response";
import CustomError from "../../../config/error";
import Enum from "../../../config/enum";

export async function GET(req) {
  try {
    await Database;
    const userRef = req.nextUrl.searchParams.get("userId");

    const startupClicks = await StartupsClicks.find({ userRef });
    return NextResponse.json(
      Response.successResponse({ success: true, startupClicks })
    );
  } catch (error) {
    return NextResponse.json(Response.errorResponse(error));
  }
}

export async function POST(req) {
  let body = await req.json();
  
  if (!body.id || !body.month || !body.userId) {
    throw new CustomError(
      Enum.HTTP_CODES.BAD_REQUEST,
      "Validation error!",
      "Required fields are missing! This error occurred in startupsClick POST."
    );
  }

  try {
    await Database;

    const searchStartupsClick = await StartupsClicks.findOne({ startupRef: body.id, month: body.month });

    if (searchStartupsClick) {
      const updateStartupsClick = await StartupsClicks.findOneAndUpdate(
        { startupRef: body.id, month: body.month },
        { $inc: { totalClick: 1 } },
        { new: true }  // Güncellenmiş belgeyi döndür
      );

      return NextResponse.json(
        Response.successResponse({ success: true, updateStartupsClick })
      );
    }

    const startupClicks = new StartupsClicks({
      startupRef: body.id,
      userRef: body.userId,
      month: body.month,
      name: body.name
    });
    await startupClicks.save();

    return NextResponse.json(
      Response.successResponse({ success: true, startupClicks })
    );
  } catch (error) {
    return NextResponse.json(Response.errorResponse(error));
  }
}

