import { PrismaClient } from "@prisma/client";

export class PrismaLocalClient {
  private static prisma: PrismaClient;

  private constructor() {}

  public static getInstancion(): PrismaClient {
    if (!PrismaLocalClient.prisma) {
      PrismaLocalClient.prisma = new PrismaClient();
    }

    return PrismaLocalClient.prisma;
  }
}
