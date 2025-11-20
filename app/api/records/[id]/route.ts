import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import {
  getNitrogenRecommendation,
  getPhosphorusRecommendation,
  getPotassiumRecommendation,
} from "@/utils/soilRating";

/**
 * GET /api/records/[id] - Get a single record by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const record = await prisma.record.findUnique({
      where: { id },
    });

    if (!record) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ data: record }, { status: 200 });
  } catch (error) {
    console.error("Get record error:", error);
    return NextResponse.json(
      { error: "Failed to fetch record" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/records/[id] - Update a record by ID
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if record exists
    const existingRecord = await prisma.record.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    // Process test results and update labTestNo and recommendations
    let testResults = body.testResults;
    if (Array.isArray(testResults) && testResults.length > 0) {
      testResults = testResults.map(
        (result: Record<string, unknown>, index: number) => {
          const processedResult: Record<string, unknown> = {
            ...result,
            labTestNo: String(index + 1).padStart(2, "0"), // Always renumber: 01, 02, 03, etc.
          };

          // Calculate and add recommendations for nitrogen, phosphorus, and potassium
          if (
            result.nitrogen &&
            typeof result.nitrogen === "string" &&
            result.nitrogen.trim() !== ""
          ) {
            const nValue = parseFloat(result.nitrogen);
            if (!isNaN(nValue)) {
              const nRec = getNitrogenRecommendation(nValue);
              processedResult.nitrogenRecommendation = {
                level: nRec.level,
                increasePercent: nRec.increasePercent,
                suggestion: nRec.suggestion,
              };
            }
          }

          if (
            result.phosphorus &&
            typeof result.phosphorus === "string" &&
            result.phosphorus.trim() !== ""
          ) {
            const pValue = parseFloat(result.phosphorus);
            if (!isNaN(pValue)) {
              const pRec = getPhosphorusRecommendation(pValue);
              processedResult.phosphorusRecommendation = {
                level: pRec.level,
                increasePercent: pRec.increasePercent,
                suggestion: pRec.suggestion,
              };
            }
          }

          if (
            result.potassium &&
            typeof result.potassium === "string" &&
            result.potassium.trim() !== ""
          ) {
            const kValue = parseFloat(result.potassium);
            if (!isNaN(kValue)) {
              const kRec = getPotassiumRecommendation(kValue);
              processedResult.potassiumRecommendation = {
                level: kRec.level,
                increasePercent: kRec.increasePercent,
                suggestion: kRec.suggestion,
              };
            }
          }

          return processedResult;
        }
      );
    }

    // Update record
    const record = await prisma.record.update({
      where: { id },
      data: {
        name: body.name !== undefined ? body.name : existingRecord.name,
        parentage:
          body.parentage !== undefined
            ? body.parentage
            : existingRecord.parentage,
        address:
          body.address !== undefined ? body.address : existingRecord.address,
        district:
          body.district !== undefined ? body.district : existingRecord.district,
        pinCode:
          body.pinCode !== undefined ? body.pinCode : existingRecord.pinCode,
        phoneNo:
          body.phoneNo !== undefined ? body.phoneNo : existingRecord.phoneNo,
        adharNo:
          body.adharNo !== undefined ? body.adharNo : existingRecord.adharNo,
        khasraNo:
          body.khasraNo !== undefined ? body.khasraNo : existingRecord.khasraNo,
        latitude:
          body.latitude !== undefined ? body.latitude : existingRecord.latitude,
        longitude:
          body.longitude !== undefined
            ? body.longitude
            : existingRecord.longitude,
        location:
          body.location !== undefined ? body.location : existingRecord.location,
        city: body.city !== undefined ? body.city : existingRecord.city,
        stateVal:
          body.stateVal !== undefined ? body.stateVal : existingRecord.stateVal,
        crop: body.crop !== undefined ? body.crop : existingRecord.crop,
        cropOther:
          body.cropOther !== undefined
            ? body.cropOther && body.cropOther.trim() !== ""
              ? body.cropOther
              : null
            : existingRecord.cropOther,
        plantationType:
          body.plantationType !== undefined
            ? body.plantationType
            : existingRecord.plantationType,
        plantationTypeOther:
          body.plantationTypeOther !== undefined
            ? body.plantationTypeOther && body.plantationTypeOther.trim() !== ""
              ? body.plantationTypeOther
              : null
            : existingRecord.plantationTypeOther,
        age:
          body.age !== undefined
            ? body.age
              ? parseFloat(String(body.age))
              : null
            : existingRecord.age,
        noTrees:
          body.noTrees !== undefined
            ? body.noTrees
              ? parseFloat(String(body.noTrees))
              : null
            : existingRecord.noTrees,
        area:
          body.area !== undefined
            ? body.area
              ? parseFloat(String(body.area))
              : null
            : existingRecord.area,
        noOfSamples:
          body.noOfSamples !== undefined
            ? body.noOfSamples
              ? parseFloat(String(body.noOfSamples))
              : null
            : existingRecord.noOfSamples,
        soilDepth:
          body.soilDepth !== undefined
            ? body.soilDepth
            : existingRecord.soilDepth,
        soilType:
          body.soilType !== undefined ? body.soilType : existingRecord.soilType,
        soilTypeOther:
          body.soilTypeOther !== undefined
            ? body.soilTypeOther && body.soilTypeOther.trim() !== ""
              ? body.soilTypeOther
              : null
            : existingRecord.soilTypeOther,
        drainage:
          body.drainage !== undefined ? body.drainage : existingRecord.drainage,
        drainageOther:
          body.drainageOther !== undefined
            ? body.drainageOther && body.drainageOther.trim() !== ""
              ? body.drainageOther
              : null
            : existingRecord.drainageOther,
        irrigationMethod:
          body.irrigationMethod !== undefined
            ? body.irrigationMethod
            : existingRecord.irrigationMethod,
        irrigationMethodOther:
          body.irrigationMethodOther !== undefined
            ? body.irrigationMethodOther &&
              body.irrigationMethodOther.trim() !== ""
              ? body.irrigationMethodOther
              : null
            : existingRecord.irrigationMethodOther,
        paramPh:
          body.paramPh !== undefined ? body.paramPh : existingRecord.paramPh,
        paramDl:
          body.paramDl !== undefined ? body.paramDl : existingRecord.paramDl,
        paramCl:
          body.paramCl !== undefined ? body.paramCl : existingRecord.paramCl,
        ph: body.ph !== undefined ? body.ph : existingRecord.ph,
        organicCarbon:
          body.organicCarbon !== undefined
            ? body.organicCarbon
            : existingRecord.organicCarbon,
        nitrogen:
          body.nitrogen !== undefined ? body.nitrogen : existingRecord.nitrogen,
        phosphorus:
          body.phosphorus !== undefined
            ? body.phosphorus
            : existingRecord.phosphorus,
        potassium:
          body.potassium !== undefined
            ? body.potassium
            : existingRecord.potassium,
        calcium:
          body.calcium !== undefined ? body.calcium : existingRecord.calcium,
        magnesium:
          body.magnesium !== undefined
            ? body.magnesium
            : existingRecord.magnesium,
        nitrogenRating:
          body.nitrogenRating !== undefined
            ? body.nitrogenRating
            : existingRecord.nitrogenRating,
        phosphorusRating:
          body.phosphorusRating !== undefined
            ? body.phosphorusRating
            : existingRecord.phosphorusRating,
        potassiumRating:
          body.potassiumRating !== undefined
            ? body.potassiumRating
            : existingRecord.potassiumRating,
        testResults:
          testResults !== undefined
            ? testResults.length > 0
              ? testResults
              : null
            : existingRecord.testResults,
      },
    });

    return NextResponse.json(
      {
        message: "Record updated successfully",
        data: record,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update record error:", error);
    return NextResponse.json(
      { error: "Failed to update record" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/records/[id] - Delete a record by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if record exists
    const existingRecord = await prisma.record.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    // Delete record
    await prisma.record.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        message: "Record deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete record error:", error);
    return NextResponse.json(
      { error: "Failed to delete record" },
      { status: 500 }
    );
  }
}
