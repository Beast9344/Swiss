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
  title: 'SeatSwap - The Premier Ticket Resale Platform',
  description: 'Easily buy and sell seasonal sports tickets.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", inter.variable, montserrat.variable)}>
      <head />
      <body
        className={cn(
          'relative h-full font-body antialiased',
          'flex flex-col'
        )}
        suppressHydrationWarning={true}
      >
        <DataProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </DataProvider>
      </body>
    </html>
  );
}
