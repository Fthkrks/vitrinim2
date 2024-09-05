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


    const user = await Users.findOne({ email });
    return NextResponse.json(Response.successResponse({ success: true, user }));
  } catch (error) {
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

  export async function PUT(req) {
    let body = await req.json();
    let updates = {};
    try {
      await Database;
  
      if (!body.email) {
        throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!");
      }
  
      // Boş stringler ve boolean değerler dahil tüm güncellemeleri kontrol et
      if (body.hasOwnProperty("name")) updates.name = body.name;
      if (body.hasOwnProperty("bio")) updates.bio = body.bio;
      if (body.hasOwnProperty("location")) updates.location = body.location;
      if (body.hasOwnProperty("revenue")) updates.revenue = body.revenue;
      if (body.hasOwnProperty("theme")) updates.theme = body.theme;
      if (body.hasOwnProperty("payment") && typeof body.payment === "boolean") updates.payment = body.payment;
      if (body.hasOwnProperty("twitter")) updates.twitter = body.twitter;
      if (body.hasOwnProperty("instagram")) updates.instagram = body.instagram;
      if (body.hasOwnProperty("youtube")) updates.youtube = body.youtube;
      if (body.hasOwnProperty("linkedin")) updates.linkedin = body.linkedin;
      if (body.hasOwnProperty("github")) updates.github = body.github;
      if (body.hasOwnProperty("tiktok")) updates.tiktok = body.tiktok;
      if (body.hasOwnProperty("avatar")) updates.avatar = body.avatar + "?alt=media";
  
      // Kullanıcıyı güncelle
      const users = await Users.updateOne({ email: body.email }, updates);
  
      // Eğer kullanıcı bulunamazsa hata fırlat
      if (!users || users.nModified === 0) {
        throw new CustomError(Enum.HTTP_CODES.NOT_FOUND, "User not found or no changes made");
      }
  
      return NextResponse.json(Response.successResponse({ success: true, users }));
    } catch (error) {
      return NextResponse.json(Response.errorResponse(error));
    }
  }
  