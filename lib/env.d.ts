declare global {
  interface CloudflareEnv {
    DATABASE_URL: string;
    SMTP_PASS: string;
    HYPERDRIVE: Hyperdrive;
    RESEND_API_KEY: string;
  }
}

export {};
