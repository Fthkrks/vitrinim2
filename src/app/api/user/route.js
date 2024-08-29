import { NextResponse } from "next/server";
import Database from "../../../lib/mongodb";
import Users from "../../../models/user.model";
import Response from "../../../config/response";
import CustomError from "../../../config/error";
import Enum from "../../../config/enum";

export async function GET() {
  try {
    await Database;

    const users = await Users.findOne({}).select("email");
    return NextResponse.json(Response.successResponse(users));
  } catch (error) {
    console.log("Error fetching feedbacks:", error);
    return NextResponse.json(Response.errorResponse(error));
  }
}



export async function POST(req) {
    let body = await req.json();
    try {
        await Database;
        const users = new Users({
            name: body.fullname,
            email: body.email,
            username: body.username,
        });
        await users.save()
        return NextResponse.json(Response.successResponse({success: true, users}));
    } catch (error) {
        return NextResponse.json(Response.errorResponse(error))
    }
  }

export async function PUT(req){
  let body = await req.json();
  let updates = {};
  try {
    await Database;

    if(!body.email){
      throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validition Error!")
    }

    if(body.name) updates.name = body.name;
    if(body.bio) updates.bio = body.bio;
    if(body.location) updates.location = body.location;
    if(body.revenue) updates.revenue = body.revenue;
    if(body.avatar) updates.avatar = body.avatar + "?alt=media";
    const users =  await Users.updateOne({email: body.email}, updates)


    return NextResponse.json(Response.successResponse({success: true, users}))

  } catch (error) {
    return NextResponse.json(Response.errorResponse(error))
  }
}