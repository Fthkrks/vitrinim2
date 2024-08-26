import { NextResponse } from "next/server";
import Database from "../../../lib/mongodb";
import Users from "../../../models/user.model";
import Response from "../../../config/response";
import { auth  } from '@clerk/nextjs/server'

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
            username: body.username
        });
        await users.save()
        return NextResponse(Response.successResponse({success: true, users}));
    } catch (error) {
        return NextResponse(Response.errorResponse(error))
    }
  }

