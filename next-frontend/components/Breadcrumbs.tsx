// components/Breadcrumbs.tsx
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUniversity } from '@/context/university-context';
import React from 'react';

export function Breadcrumbs() {
  const pathname = usePathname();
  const { selectedUniversity } = useUniversity();

  // Skip rendering if we're at the root
  if (pathname === '/') return null;

  const getVerticalStyle = () => {
    if (!selectedUniversity) return '';
    return verticalStyles[selectedUniversity.vertical].text;
  };

  // Generate breadcrumb segments
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: `/${segment}`,
    }));

  return (
    <nav className="flex items-center space-x-1 text-sm">
      <Link
        href="/dashboard"
        className={`flex items-center hover:text-primary transition-colors ${
          pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {segments.map((segment, index) => (
        <React.Fragment key={segment.href}>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Link
            href={segment.href}
            className={`hover:text-primary transition-colors ${
              index === segments.length - 1
                ? getVerticalStyle()
                : 'text-muted-foreground'
            }`}
          >
            {segment.name}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}
