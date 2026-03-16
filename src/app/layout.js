import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-heading", display: "swap" });

export const metadata = {
  title: "Thiết Kế Website Giá Rẻ - Chuyên Nghiệp, Chuẩn SEO | MOCMOC",
  description: "Dịch vụ thiết kế website giá rẻ, trọn gói, chuyên nghiệp và chuẩn SEO từ MOCMOC. Tối ưu chi phí, nâng tầm thương hiệu, giao diện độc quyền, bảo hành trọn đời.",
  keywords: ["thiết kế website giá rẻ", "thiet ke web gia re", "làm website giá rẻ", "nhận thiết kế web giá rẻ", "thiết kế website trọn gói", "dịch vụ làm web giá rẻ", "thiết kế website chuyên nghiệp giá rẻ", "công ty thiết kế web giá rẻ", "MOCMOC"],
  authors: [{ name: "MOCMOC" }],
  creator: "MOCMOC",
  publisher: "MOCMOC",
  openGraph: {
    title: "Thiết Kế Website Giá Rẻ - Chuyên Nghiệp, Chuẩn SEO | MOCMOC",
    description: "Dịch vụ thiết kế website giá rẻ, trọn gói, chuyên nghiệp và chuẩn SEO từ MOCMOC. Tối ưu chi phí, nâng tầm thương hiệu, giao diện độc quyền, bảo hành trọn đời.",
    url: "https://mocmoc.vn",
    siteName: "MOCMOC",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thiết Kế Website Giá Rẻ - Chuyên Nghiệp, Chuẩn SEO | MOCMOC",
    description: "Giải pháp thiết kế website giá rẻ, chuyên nghiệp, tối ưu chi phí cho cá nhân và doanh nghiệp. Gọi ngay 033 6617 900.",
  },
  icons: {
    icon: '/images/logomocmocnho.png',
    apple: '/images/logomocmocnho.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "eVdJKbkk4JBjVY3Z70CH3kkhd30_LLceJUUO2ikzKQ0",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-33R9G7ML1Q" strategy="lazyOnload" />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-33R9G7ML1Q');
          `}
        </Script>
      </body>
    </html>
  );
}
