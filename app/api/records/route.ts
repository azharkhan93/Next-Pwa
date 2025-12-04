import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/utils/prisma";
import { generateConsumerId } from "@/utils/generateConsumerId";
import { searchRecords, getPaginatedRecords } from "@/utils/recordSearch";
import { processTestResults } from "@/utils/processTestResults";

/**
 * GET /api/records - Get all records with optional search
 * Query params:
 * - page: page number (default: 1)
 * - limit: records per page (default: 10)
 * - search: search term for consumerId, phoneNo, or labTestNo
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    // Use utility functions for search or pagination
    const { records, total } =
      search && search.trim() !== ""
        ? await searchRecords(search, page, limit)
        : await getPaginatedRecords(page, limit);

    return NextResponse.json(
      {
        data: records,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get records error:", error);
    return NextResponse.json(
      { error: "Failed to fetch records" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/records - Create a new record
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate unique consumer ID (3 to 5 numeric digits)
    // Always generate on backend - ignore if provided in request
    let consumerId: string;
    try {
      consumerId = await generateConsumerId();
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Failed to generate unique consumer ID. Please try again." },
        { status: 500 }
      );
    }

    // Process test results using utility function
    const testResults = processTestResults(body.testResults || []);

    // Create record
    const record = await prisma.record.create({
      data: {
        consumerId,
        name: body.name,
        parentage: body.parentage || null,
        address: body.address || null,
        district: body.district || null,
        pinCode: body.pinCode || null,
        phoneNo: body.phoneNo || null,
        adharNo: body.adharNo || null,
        khasraNo: body.khasraNo || null,
        latitude: body.latitude || null,
        longitude: body.longitude || null,
        location: body.location || null,
        city: body.city || null,
        stateVal: body.stateVal || null,
        crop: body.crop || null,
        cropOther: body.cropOther && body.cropOther.trim() !== '' ? body.cropOther : null,
        variety: body.variety && body.variety.trim() !== '' ? body.variety : null,
        plantationType: body.plantationType || null,
        plantationTypeOther: body.plantationTypeOther && body.plantationTypeOther.trim() !== '' ? body.plantationTypeOther : null,
        age: body.age ? parseFloat(String(body.age)) : null,
        noTrees: body.noTrees ? parseFloat(String(body.noTrees)) : null,
        area: body.area ? parseFloat(String(body.area)) : null,
        noOfSamples: body.noOfSamples
          ? parseFloat(String(body.noOfSamples))
          : null,
        soilDepth: body.soilDepth || null,
        soilType: body.soilType || null,
        soilTypeOther: body.soilTypeOther && body.soilTypeOther.trim() !== '' ? body.soilTypeOther : null,
        drainage: body.drainage || null,
        drainageOther: body.drainageOther && body.drainageOther.trim() !== '' ? body.drainageOther : null,
        irrigationMethod: body.irrigationMethod || null,
        irrigationMethodOther: body.irrigationMethodOther && body.irrigationMethodOther.trim() !== '' ? body.irrigationMethodOther : null,
        paramPh: body.paramPh || false,
        paramDl: body.paramDl || false,
        paramCl: body.paramCl || false,
        parameterPrice: body.parameterPrice ? parseFloat(String(body.parameterPrice)) : null,
        paymentStatus: body.paymentStatus || null,
        paymentDate: body.paymentDate ? new Date(body.paymentDate) : null,
        ph: body.ph || null,
        organicCarbon: body.organicCarbon || null,
        nitrogen: body.nitrogen || null,
        phosphorus: body.phosphorus || null,
        potassium: body.potassium || null,
        calcium: body.calcium || null,
        magnesium: body.magnesium || null,
        nitrogenRating: body.nitrogenRating || null,
        phosphorusRating: body.phosphorusRating || null,
        potassiumRating: body.potassiumRating || null,
        testResults: testResults.length > 0 ? (testResults as Prisma.InputJsonValue) : null,
      },
    });

    return NextResponse.json(
      {
        message: "Record created successfully",
        data: record,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create record error:", error);
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return NextResponse.json(
        { error: "Consumer ID already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create record" },
      { status: 500 }
    );
  }
}

