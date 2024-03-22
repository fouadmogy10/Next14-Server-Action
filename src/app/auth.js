import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "../lib/db-connect";
import user_model from "../lib/user_model";
export const authConfig =    {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },

        async authorize(credentials) {
          await dbConnect();
          try {
            const user = await user_model.findOne({ email: credentials.email });
            if (user) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );
              if (isPasswordCorrect) {
                return user;
              }
            }
          } catch (err) {
            throw new Error(err);
          }
        },
      }),
    ],
    
    callbacks: {
      async signIn({ user, account }) {
          if (account?.provider == "credentials") {
            // session.user.id = user._id;
            return true;
          }
    
        },
  
      jwt: async ({ token, user }) => {
          const userByEmail = await user_model.findOne({ email: token.email });
          userByEmail.password = undefined;
          token.user = userByEmail;
          return token;
          },
  
  
      session: async ({ session, token }) => {
          session.user = token.user;
          return session;
          },
         
  
    },
}
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(
    authConfig
);