"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const checkIsAuthenticated = async () => {
  const session = await getServerSession(authOptions); // Actually get the session!
  return !!session;
};