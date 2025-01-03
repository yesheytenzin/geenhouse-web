import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";


export async function GET(request: NextRequest) {
  const authorizationHeader = request.headers.get('Authorization');

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // Remove "Bearer " from the token
    // Now 'token' contains the actual token value
    const accessToken = await db.accessToken.findUnique({
      where: {
        token,
        expiresAt: {
          gte: new Date(new Date().getTime() - 60 * 60 * 24 * 1000),
        },
      },
      select: {
        userId: true
      }
    });
    if (accessToken) {
      const data = await db.user.findUnique({
        where: {
          id: accessToken.userId
        },
        select: {
          controllers: {
            select: {
              readings: {
                select: {
                  Pressure: true,
                  soilMoisture: true,
                  temperature: true,
                  humidity: true,
                  recordedAt: true,
                }
              },
              waterScheduleRecords: {
                select: {
                  startTime: true,
                  endTime: true,
                  repetitionDays: true
                },
              },
              HumidityThresholdRecord: {
                select: {
                  recordedAt: true,
                  value: true
                }
              },
              TemperatureThresholdRecord: {
                select: {
                  recordedAt: true,
                  value: true,
                }
              },
              soilMoistureThresholdRecords: {
                select: {
                  recordedAt: true,
                  value: true,
                }
              },
            }
          }
        }
      });

      // Combine arrays for each property
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
        soilMoistureThresholdRecords: []
      };

      data?.controllers.forEach(controller => {
        combinedData.readings = combinedData.readings.concat(controller.readings);
        combinedData.waterScheduleRecords = combinedData.waterScheduleRecords.concat(controller.waterScheduleRecords);
        combinedData.HumidityThresholdRecord = combinedData.HumidityThresholdRecord.concat(controller.HumidityThresholdRecord);
        combinedData.TemperatureThresholdRecord = combinedData.TemperatureThresholdRecord.concat(controller.TemperatureThresholdRecord);
        combinedData.soilMoistureThresholdRecords = combinedData.soilMoistureThresholdRecords.concat(controller.soilMoistureThresholdRecords);
      });

      console.log(combinedData);
      return NextResponse.json(combinedData);
    }
  }
  console.log("not valid")
  return NextResponse.json({
    message: "Not Authorization"
  }, { status: 401 });
}
