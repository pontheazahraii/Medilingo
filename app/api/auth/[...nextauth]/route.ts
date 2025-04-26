import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,    // Ensure the ! is safe, meaning the variable is guaranteed to be defined
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,  // Same here
    }),
  ],
  pages: {
    signIn: "/sign-in", // Optional: Custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET,  // This is your secret key for signing JWT tokens
  session: {
    strategy: "jwt",  // Use JWT sessions instead of database sessions
  },
  callbacks: {
    async jwt({ token, account }) {
      // Save user info in the token when the user first signs in
      if (account) {
        token.accessToken = account.access_token;  // Store the OAuth access token in the JWT
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the JWT to the session
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
