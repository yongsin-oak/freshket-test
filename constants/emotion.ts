import "@emotion/react"
declare module "@emotion/react" {
  export interface Theme {
    text: string;
    background: string;
    tint: string;
    icon: string;
    tabIconDefault: string;    
    tabIconSelected: string;
    error: string;
    success: string;
    primary: string;
    primary100: string;
    primary200: string;
    white: string;
    black: string;
  }
}