/// <reference types="astro/client" />
declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.astro' {
  const Component: import('astro').AstroComponentFactory;
  export default Component;
}
