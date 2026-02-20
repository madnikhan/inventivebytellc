import { NextRequest, NextResponse } from "next/server";
import { createOrUpdateResourceFromPortfolioId } from "@/lib/portfolio-to-blog";

export const runtime = "nodejs";

/**
 * POST /api/sanity/portfolio-to-blog
 *
 * Creates or updates a Resource (blog post) in Sanity from a portfolio project.
 * Call when a portfolio is created/updated (e.g. from a Sanity webhook).
 *
 * Body: { _id: string } or { id: string } or { documentId: string }
 * Header: x-sanity-webhook-secret (optional; must match SANITY_WEBHOOK_SECRET)
 */
export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-sanity-webhook-secret");
    const expectedSecret = process.env.SANITY_WEBHOOK_SECRET;
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json(
        {
          message:
            "SANITY_API_TOKEN not set. Create a write token in Sanity Dashboard → API → Tokens to enable auto-blog creation.",
        },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const documentId = body._id ?? body.id ?? body.documentId;
    if (!documentId || typeof documentId !== "string") {
      return NextResponse.json(
        { message: "Missing document id. Send { _id } or { documentId } in body." },
        { status: 400 }
      );
    }

    const result = await createOrUpdateResourceFromPortfolioId(documentId);
    if (!result) {
      return NextResponse.json(
        { message: "Portfolio document not found or wrong type", id: documentId },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      action: result.action,
      slug: result.slug,
      resourceId: result.resourceId,
    });
  } catch (error) {
    console.error("[portfolio-to-blog]", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to create blog from portfolio" },
      { status: 500 }
    );
  }
}
