'use client';

import { useRouter } from 'next/navigation';
import BaseContainer from "@/components/layout/container/base-container";
import TextHeading from "@/components/ui/text/text-heading";
import Text from "@/components/ui/text/text";
import { Button } from "@/components/ui/button";
import { Home, Construction } from "lucide-react";
import { monoFont } from './styles/fonts/fonts';
import { cn } from '@/lib/utils';

export default function NotFound() {
  const router = useRouter();

  return (
    <BaseContainer size="md" paddingX="md" paddingY="lg" center>
      <div className={cn(
        "flex flex-col items-center justify-center min-h-[70vh]",
        "text-center",
        monoFont.className
      )}>
        <Construction className="w-16 h-16 text-purple-500 mb-4" />
        
        <TextHeading as="h1" weight="bold" className="mb-2">
          Coming Soon
        </TextHeading>
        
        <TextHeading as="h2" weight="medium" className="mb-6">
          Under Construction
        </TextHeading>

        <Text variant="muted" className="mb-8 max-w-md">
          This page is currently in the process of cooking. Check back later!
        </Text>

        <Button
          onClick={() => router.push('/')}
          variant="outline"
          className="gap-2"
        >
          <Home size={16} />
          Back to Home
        </Button>
      </div>
    </BaseContainer>
  );
} 