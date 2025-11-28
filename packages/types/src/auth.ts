export interface CustomJwtSessionClaims {
  metadata?: {
    role?: "user" | "admin";
    [key: string]: any;
  };
  [key: string]: any;
}
