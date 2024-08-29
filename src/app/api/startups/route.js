import { NextResponse } from "next/server";
import Database from "../../../lib/mongodb";
import Startups from "../../../models/startups.model";
import Response from "../../../config/response";
import CustomError from "../../../config/error";
import Enum from "../../../config/enum";

export async function GET(req) {
  try {
    await Database;
    const emailRef = req.nextUrl.searchParams.get("email");

    if (!emailRef) {
      throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Email is required");
    }

    const startup = await Startups.find({ emailRef });
    return NextResponse.json(
      Response.successResponse({ success: true, startup })
    );
  } catch (error) {
    return NextResponse.json(Response.errorResponse(error));
  }
}

export async function POST(req) {
  let body = await req.json();
  try {
    await Database;
    const startup = await new Startups({
      url: body.url,
      emailRef: body.email,
      userRef: body.id,
    });
    await startup.save();
    return NextResponse.json(
      Response.successResponse({ success: true, startup })
    );
  } catch (error) {
    return NextResponse.json(Response.errorResponse(error));
  }
}

export async function PUT(req) {
  let body = await req.json();
  let updates = {};
  try {
    await Database;

    if (!body.id) {
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "Validition error!",
        "projectId not found! this error startups put"
      );
    }

    if (body.name) updates.name = body.name;
    if (body.url) updates.url = body.url;
    if (body.desc) updates.desc = body.desc;
    if (body.desc) updates.desc = body.desc;
    if (body.category) updates.category = body.category;
    if (body.logo) updates.logo = body.logo + "?alt=media";
    if(body.banner) updates.banner = body.banner + "?alt=media";
    if (typeof body.active === "boolean") updates.active = body.active;

    const startup = await Startups.updateOne({ _id: body.id }, updates);

    return NextResponse.json(
      Response.successResponse({ success: true, startup })
    );
  } catch (error) {
    return NextResponse.json(Response.errorResponse(error));
  }
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get('id');
  
  try {
    await Database;
    if (!id) {
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "Validation error!",
        "id not found! this error startups delete"
      );
    }

    
    const startup = await Startups.findOneAndDelete({ _id: id });

    return NextResponse.json(
      Response.successResponse({ success: true, startup })
    );
  } catch (error) {
    return NextResponse.json(Response.errorResponse(error));
  }
}

