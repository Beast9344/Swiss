import { Ticket } from 'lucide-react';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Ticket className="h-7 w-7 text-primary" />
      <span className="text-2xl font-bold font-headline text-primary uppercase">
        Swiss
      </span>
    </Link>
  );
}
