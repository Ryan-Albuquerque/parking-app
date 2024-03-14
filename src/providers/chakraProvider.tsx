// app/providers.tsx
'use client';

import { ChakraProvider as Provider } from '@chakra-ui/react';

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}
