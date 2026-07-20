export {};

export type Roles = "admin" | "user" | "premium-user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
