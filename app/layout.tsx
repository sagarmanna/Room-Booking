import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { BookingProvider } from "@/context/BookingContext";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Room Booking Dashboard",
  description: "Luxury Room Booking Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent theme flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                const theme = localStorage.getItem("theme");
                if (theme === "dark") {
                  document.documentElement.classList.add("dark");
                }
              })();
            `,
          }}
        />
      </head>

      <body
        className={`${poppins.className} bg-slate-50 dark:bg-slate-950 transition-colors duration-500`}
      >
        <AuthProvider>
          <BookingProvider>{children}</BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}