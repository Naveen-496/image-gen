import { NextRequest, NextResponse } from "next/server";
import { fal } from "@ai-sdk/fal";
import { experimental_generateImage as generateImage } from "ai";
import fs from "fs";
import path from "path";

const defaultPrompt = "A serene mountain landscape at sunset";
const imagesDir = path.join(process.cwd(), "public", "generated-images");

// Ensure the directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    console.log({ prompt });

    // Generate the image
    const { image } = await generateImage({
      model: fal.image("fal-ai/fast-sdxl"),
      prompt: prompt || defaultPrompt,
    });

    // Define file path
    const filename = `image-${Date.now()}.png`;
    const filepath = path.join(imagesDir, filename);

    // Save the image
    fs.writeFileSync(filepath, image.uint8Array);
    console.log(`Image saved at: ${filepath}`);

    // Return image URL
    return NextResponse.json({
      message: "Image generated successfully",
      imageUrl: `/generated-images/${filename}`,
      success: true,
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { message: "Error generating image", success: false },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const filename = url.searchParams.get("filename");

    if (!filename) {
      return NextResponse.json(
        { message: "Filename is required", success: false },
        { status: 400 }
      );
    }

    const filepath = path.join(imagesDir, filename);

    if (!fs.existsSync(filepath)) {
      return NextResponse.json(
        { message: "File not found", success: false },
        { status: 404 }
      );
    }

    // Read file as Buffer
    const fileBuffer = fs.readFileSync(filepath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename=${filename}`,
      },
    });
  } catch (error) {
    console.error("Error downloading image:", error);
    return NextResponse.json(
      { message: "Error downloading image", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { filename } = await request.json();

    if (!filename) {
      return NextResponse.json(
        { message: "Filename is required", success: false },
        { status: 400 }
      );
    }

    const filepath = path.join(imagesDir, filename);

    if (!fs.existsSync(filepath)) {
      return NextResponse.json(
        { message: "File not found", success: false },
        { status: 404 }
      );
    }

    fs.unlinkSync(filepath);
    return NextResponse.json({
      message: "File deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { message: "Error deleting image", success: false },
      { status: 500 }
    );
  }
}
