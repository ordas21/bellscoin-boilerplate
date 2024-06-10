import { ThemeProvider } from "@/components/layout/ThemeToggle/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/layout/footer";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: '%s | bellscoin app',
    default: 'bellscoin app',
  },
  description: 'Invest directly in artists and help grow their career',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  const navItems = [
    { name: "", link: "/", icon: <IconHome /> },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FloatingNav navItems={navItems} />
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
