import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth";
import Providers from 'next-auth/providers/credentials';


export default NextAuth({
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Providers({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const userCollection = client.db().collection('users');

        const user = await userCollection.findOne({
          email: credentials.email
        });

        if (!user) {
          client.close();
          throw new Error("No user found!!!")
        }

        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid credentials")
        }

        client.close();

        return {
          email: user.email
        }

      }
    })
  ]
})