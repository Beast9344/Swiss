import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster"
import { Inter, Literata } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '700'],
  display: 'swap',
});

const literata = Literata({
  subsets: ['latin'],
  variable: '--font-literata',
  weight: ['400', '700'],
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
    <html lang="en" className={cn("h-full", inter.variable, literata.variable)}>
      <head />
      <body
        className={cn(
          'relative h-full font-body antialiased',
          'flex flex-col'
        )}
        suppressHydrationWarning={true}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
