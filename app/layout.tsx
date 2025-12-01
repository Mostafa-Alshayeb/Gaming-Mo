import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QueryProvaider from "@/lib/QueryProvaider";
import { WishlistProvider } from "@/app/context/WishlistContext";

const montserrat = Montserrat({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaming Mo",
  description: "This is a gaming website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} data: antialiased background`}>
        <QueryProvaider>
          <WishlistProvider>
            <ToastContainer
              position="top-center"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              pauseOnHover={false}
              theme="dark"
            />
            {children}
          </WishlistProvider>
        </QueryProvaider>
      </body>
    </html>
  );
}
