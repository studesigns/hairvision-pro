import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const maintenance = searchParams.get("maintenance")
    const sortBy = searchParams.get("sortBy") || "popularity"

    let query = supabase
      .from("hairstyles")
      .select("*")

    // Apply filters
    if (category && category !== "All") {
      query = query.eq("category", category)
    }

    if (maintenance) {
      query = query.eq("maintenance_level", maintenance)
    }

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,description.ilike.%${search}%,tags.cs.{${search}}`
      )
    }

    // Apply sorting
    if (sortBy === "popularity") {
      query = query.order("popularity", { ascending: false, nullsFirst: false })
    } else if (sortBy === "name") {
      query = query.order("name", { ascending: true })
    } else if (sortBy === "newest") {
      query = query.order("created_at", { ascending: false })
    } else {
      // Default to newest first
      query = query.order("created_at", { ascending: false })
    }

    const { data, error } = await query

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to fetch hairstyles" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      total: data?.length || 0,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("hairstyles")
      .insert(body)
      .select()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data[0],
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: "Failed to create hairstyle" },
      { status: 500 }
    )
  }
}
