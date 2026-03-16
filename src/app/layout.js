import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-heading" });

export const metadata = {
  title: "MOCMOC | Thiết Kế Website Chuyên Nghiệp Đỉnh Cao",
  description: "Nâng tầm thương hiệu với dịch vụ thiết kế website chuyên nghiệp chuẩn SEO của MOCMOC.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
