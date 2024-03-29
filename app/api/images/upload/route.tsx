import cloudinary from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();

  let mime = file.type;
  let encoding = "base64";
  let base64Data = Buffer.from(arrayBuffer).toString("base64");
  let fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

  try {
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .unsigned_upload(
            fileUri,
            process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!
          )
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    };

    const result = await uploadToCloudinary();
    let imageUrl = (result as any).secure_url;

    return NextResponse.json(
      {
        success: true,
        imageUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Server Error: ", error);
    return NextResponse.json(
      { err: "Internal Server Error" },
      { status: 500 }
    );
  }
}
