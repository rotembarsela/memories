import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "REGISTER REQUEST FAILED");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
