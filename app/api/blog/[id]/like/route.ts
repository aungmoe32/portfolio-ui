import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    // Increment the like count in Sanity
    const result = await client
      .patch(id)
      .setIfMissing({ likeCount: 0 })
      .inc({ likeCount: 1 })
      .commit();

    if (!result) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      likeCount: result.likeCount,
      message: "Like count updated successfully",
    });
  } catch (error) {
    console.error("Error updating like count:", error);
    return NextResponse.json(
      { error: "Failed to update like count" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    // Get current like count from Sanity
    const blog = await client.fetch(
      `*[_type == "blog" && _id == $id][0]{ likeCount }`,
      { id }
    );

    if (!blog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      likeCount: blog.likeCount || 0,
    });
  } catch (error) {
    console.error("Error fetching like count:", error);
    return NextResponse.json(
      { error: "Failed to fetch like count" },
      { status: 500 }
    );
  }
}
