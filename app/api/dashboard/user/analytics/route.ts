import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUser } from "@/lib/session";

export async function GET(request: NextRequest) {
  const user = await getUser();
  const id = request.nextUrl.searchParams.get("id");
  if (user) {
    const userData = await db.user.findUnique({
      where: {
        id: id as string,
      },
      select: {
        controllers: {
          select: {
            waterScheduleRecords: {
              select: {
                startTime: true,
                endTime: true,
                repetitionDays: true,
              },
            },
            HumidityThresholdRecord: {
              select: {
                value: true,
                recordedAt: true,
              },
            },
            TemperatureThresholdRecord: {
              select: {
                value: true,
                recordedAt: true,
              },
            },
            soilMoistureThresholdRecords: {
              select: {
                value: true,
                recordedAt: true,
              },
            },
            readings: {
              select: {
                recordedAt: true,
                Pressure: true,
                temperature: true,
                soilMoisture: true,
                humidity: true,
              },
            },
          },
        },
      },
    });

    const combinedData: {
      readings: {
        Pressure: number | null;
        soilMoisture: number | null;
        temperature: number | null;
        humidity: number | null;
        recordedAt: Date;
      }[];
      waterScheduleRecords: {
        startTime: string;
        endTime: string;
        repetitionDays: number;
      }[];
      HumidityThresholdRecord: {
        recordedAt: Date;
        value: number;
      }[];
      TemperatureThresholdRecord: {
        recordedAt: Date;
        value: number;
      }[];
      soilMoistureThresholdRecords: {
        recordedAt: Date;
        value: number;
      }[];
    } = {
      readings: [],
      waterScheduleRecords: [],
      HumidityThresholdRecord: [],
      TemperatureThresholdRecord: [],
      soilMoistureThresholdRecords: [],
    };

    userData?.controllers.forEach((controller) => {
      combinedData.readings = combinedData.readings.concat(controller.readings);
      combinedData.waterScheduleRecords =
        combinedData.waterScheduleRecords.concat(
          controller.waterScheduleRecords,
        );
      combinedData.HumidityThresholdRecord =
        combinedData.HumidityThresholdRecord.concat(
          controller.HumidityThresholdRecord,
        );
      combinedData.TemperatureThresholdRecord =
        combinedData.TemperatureThresholdRecord.concat(
          controller.TemperatureThresholdRecord,
        );
      combinedData.soilMoistureThresholdRecords =
        combinedData.soilMoistureThresholdRecords.concat(
          controller.soilMoistureThresholdRecords,
        );
    });
    return NextResponse.json(combinedData);
  }
  return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
}
