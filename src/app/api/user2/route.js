import { NextResponse } from "next/server";
import Database from "../../../lib/mongodb";
import Users from "../../../models/user.model";
import Response from "../../../config/response";
import CustomError from "../../../config/error";
import Enum from "../../../config/enum";

export async function GET(req) {
    try {
      await Database;
      
      const email = req.nextUrl.searchParams.get("email");
  
      if (!email) {
        throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Email is required!");
      }
  
      const user = await Users.findOne({ email });
      return NextResponse.json(Response.successResponse({ success: true, user }));
    } catch (error) {
      return NextResponse.json(Response.errorResponse(error));
    }
  }
  