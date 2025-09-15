import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import { DefaultSession, DefaultUser } from "next-auth";
import { Session } from "inspector/promises";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
  }

  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

export const authOptions: AuthOptions = {
    secret:process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials", 
      id: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const client = await clientPromise;

        await client.connect();
        const db = client.db("personal-portfolio");

        const user = await db.collection("users").findOne({
          username: credentials.username,
          password: credentials.password,
        });

        if (!user) return null;

        return {
          id: user._id.toString(),
          username: user.username,
        };
      },
    }),
  ],
   session: {
      strategy: "jwt", // jwt means sessions are stored as json web tokens rather than in the db
      maxAge: 60,
    },
    jwt: {
      maxAge: 60,

    },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};