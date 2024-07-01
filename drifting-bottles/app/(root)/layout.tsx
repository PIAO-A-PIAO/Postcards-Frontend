import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "../../components/cards/Topbar";
import LeftSidebar from "../../components/cards/LeftSidebar";
import RightSidebar from "../../components/cards/RightSidebar";
import Bottombar from "../../components/cards/Bottombar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Drifting Bottles",
  description: "A Next.js 14 Drifting Bottles Application",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />
          <main>
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
