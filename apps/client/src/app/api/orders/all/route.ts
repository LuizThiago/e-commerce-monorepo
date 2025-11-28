import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const ORDER_SERVICE_URL =
  process.env.ORDER_SERVICE_URL || "http://localhost:8001";

export async function GET(request: NextRequest) {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - No token available" },
        { status: 401 }
      );
    }

    const response = await fetch(`${ORDER_SERVICE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Order service error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
