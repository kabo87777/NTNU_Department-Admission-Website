export {};

declare global {
  interface Window {
    turnstile?: {
      reset: () => void;
    };
    onTurnstileSuccessfulVerification: (token: string) => void;
    onTurnstileTokenExpiration: () => void;
    onTurnstileFailedVerification: () => void;
  }
}
