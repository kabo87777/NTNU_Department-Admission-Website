export {};

declare global {
  interface Window {
    turnstile?: {
      reset: () => void;
      remove: () => void;
    };
    onTurnstileSuccessfulVerification: (token: string) => void;
    onTurnstileTokenExpiration: () => void;
    onTurnstileFailedVerification: () => void;
  }
}
