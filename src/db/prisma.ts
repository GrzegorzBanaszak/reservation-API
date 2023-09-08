import { PrismaClient } from "@prisma/client";
import { Injectable } from "../injection/injector";

@Injectable()
export class PrismaLocalClient extends PrismaClient {}
