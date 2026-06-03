/**
 * NextAuth (Auth.js) Configuration
 * Uses credentials provider for email/password authentication.
 * Setup will be completed in Step 2 with proper Prisma adapter.
 */

// TODO: Configure NextAuth with:
// - CredentialsProvider (email + password)
// - PrismaAdapter for session/account persistence
// - JWT strategy with custom claims (role, companyName)
// - Callbacks for session enrichment

export const authConfig = {
  // Placeholder — will be replaced with full NextAuth configuration
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
};
