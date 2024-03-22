import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Full Stack Todo App with Next.js",
  description:
    "Create a full stack todo application with Next.js, TypeScript, Prisma, and MongoDB",
  keywords: [
    "Next.js",
    "mongoose",
    "MongoDB",
    "Server Actions",
    "Server Components",
  ],
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          "   min-h-[100vh] flex justify-between  flex-col"
        }
      >
        <Providers>
          <Toaster />
          <Navbar />
          <main className="flex-grow m-5">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
