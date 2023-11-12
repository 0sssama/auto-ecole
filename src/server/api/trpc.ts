/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { prisma } from "@/server/db";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { RequestLike } from "@clerk/nextjs/dist/types/server/types";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = (opts: FetchCreateContextFnOptions) => {
  const { req } = opts;
  const sesh = getAuth(req as RequestLike);

  const userId = sesh.userId;
  const orgId = sesh.orgId;

  return {
    prisma,
    userId,
    orgId,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/**
 * Private (authenticated) procedure
 */
const enforceUserAuthentication = t.middleware(async ({ ctx, next }) => {
  if (!ctx.userId || !ctx.orgId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      userId: ctx.userId,
      orgId: ctx.orgId,
    },
  });
});

/**
 * Organization member only procedure (user must be part of an org)
 */
const enforceOrgMember = t.middleware(async ({ ctx, next }) => {
  const { orgId } = ctx;

  const org = await clerkClient.organizations.getOrganization({
    organizationId: orgId!,
  });

  if (!org) throw new TRPCError({ code: "UNAUTHORIZED" });

  return next({
    ctx: {
      userId: ctx.userId,
      orgId: ctx.orgId,
    },
  });
});

/**
 * Organization admin only procedure
 */
const enforceOrgAdminOnly = t.middleware(async ({ ctx, next }) => {
  const { userId, orgId } = ctx;

  const memberships =
    await clerkClient.organizations.getOrganizationMembershipList({
      organizationId: orgId!, // we know this is defined because of enforceOrgMember
    });

  const membership = memberships.find(
    (m) => m.publicUserData?.userId === userId,
  );

  if (!membership || membership.role !== "admin")
    throw new TRPCError({ code: "UNAUTHORIZED" });

  return next({
    ctx: {
      userId: ctx.userId,
      orgId: ctx.orgId,
      membership,
    },
  });
});

export const privateProcedure = t.procedure.use(enforceUserAuthentication);
export const orgMembersProcedure = privateProcedure.use(enforceOrgMember);
export const orgAdminOnlyPrecedure =
  orgMembersProcedure.use(enforceOrgAdminOnly);
//   export const orgSuperAdminOnlyPrecedure =
//   orgMembersProcedure.use(enforceOrgSuperAdminOnly);
