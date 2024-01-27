import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SignCom",
  description: "App Created by ZIA",
  url: "https://signcom.vercel.app",
  image: '../assets/logo.png',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link type="icon" href="../assets/logo.png"/>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
