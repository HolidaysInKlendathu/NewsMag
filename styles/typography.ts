// styles/typography.ts
export const typography = {
    h1: 'text-4xl font-bold tracking-tight lg:text-5xl',
    h2: 'text-3xl font-extralight italic tracking-tight lg:text-4xl',
    h3: 'text-2xl font-semibold tracking-tight',
    h4: 'text-xl font-semibold tracking-tight',
    p: 'leading-7',
    'lead-p': 'text-xl text-muted-foreground',
    large: 'text-lg font-semibold',
    small: 'text-sm font-medium leading-none',
    muted: 'text-sm text-muted-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  } as const
  
  export type Typography = typeof typography;