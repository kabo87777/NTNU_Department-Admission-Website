export {};

declare global {
  interface Window {
    onTurnstileSuccessfulVerification: (token: string) => void;
    onTurnstileTokenExpiration: () => void;
    onTurnstileFailedVerification: () => void;  
  }
}
