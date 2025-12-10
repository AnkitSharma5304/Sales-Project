import { NextRequest, NextResponse } from "next/server";
import { salesByYear, years } from "@/data/sales";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const year = searchParams.get("year");

  if (year) {
    const data = salesByYear[year];
    if (!data) {
      return NextResponse.json({ error: "Year not found" }, { status: 404 });
    }

    return NextResponse.json({ data, year, years });
  }

  return NextResponse.json({ data: salesByYear, years });
}

