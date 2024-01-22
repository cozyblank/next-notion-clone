// 수업 자료의 공식 문서를 참고해주세요!
import cloudinary from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { extractPublicId } from "cloudinary-build-url";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { url } = await req.json();
    const public_id = extractPublicId(url);

    const result = await cloudinary.v2.uploader.destroy(public_id, {
      invalidate: true,
      resource_type: "image",
    });
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
