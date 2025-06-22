import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster"
import { Inter, Montserrat } from 'next/font/google';
import { DataProvider } from '@/context/DataContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '700'],
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Swiss - The Premier Ticket Resale Platform',
  description: 'Easily buy and sell seasonal sports tickets.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, montserrat.variable)}>
      <head />
      <body
        className={cn(
          'font-body antialiased'
        )}
        suppressHydrationWarning={true}
      >
        <DataProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </DataProvider>
      </body>
    </html>
  );
}
