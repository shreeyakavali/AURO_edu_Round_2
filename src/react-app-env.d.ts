/// <reference types="react-scripts" />

// Custom type declarations for your project
declare namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      readonly REACT_APP_API_BASE_URL?: string;
      readonly REACT_APP_WS_URL?: string;
      readonly REACT_APP_AI_SERVICE_KEY?: string;
    }
  }
  
  // Add support for CSS Modules
  declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }
  
  declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }
  
  // Support for SVG imports as React components
  declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & { title?: string }
    >;
    const src: string;
    export default src;
  }
  
  // Add types for your custom assets if needed
  declare module '*.mp3' {
    const src: string;
    export default src;
  }
  
  declare module '*.wav' {
    const src: string;
    export default src;
  }
  
  // For WebSocket mock in tests
  declare module 'mock-socket' {
    export class Server {
      constructor(url: string);
      on(event: string, callback: (socket: any) => void): void;
      close(): void;
    }
  }
  
  // Zustand store extensions if needed
  declare module 'zustand' {
    interface StoreApi<T> {
      persist?: {
        setOptions: (options: any) => void;
        clearStorage: () => void;
      };
    }
  }