# Next Boilerplate

This is a cool boilerplate for Next.js projects. It includes setup for the following tools:

## Framework

- [x] [Next.js](https://nextjs.org/)

## DX

- [x] [TypeScript](https://www.typescriptlang.org/)
- [x] [Pnpm](https://pnpm.io/)
- [x] [ESLint](https://eslint.org/)
- [x] [Prettier](https://prettier.io/)
- [x] [Husky](https://typicode.github.io/husky/)

## Backend (sort of)

- [x] [TRPC](https://trpc.io/)
- [x] [Clerk](https://clerk.dev/)
- [x] [Prisma](https://www.prisma.io/)
- [x] [PlanetScale](https://planetscale.com/)
- [x] [Uploadthing](https://uploadthing.com/)

## Back-front integration

- [x] [React Query](https://react-query.tanstack.com/)
- [x] [Zod](https://zod.dev/)
- [x] [React Hook Form](https://react-hook-form.com/)

## UI

- [x] [Tailwind CSS](https://tailwindcss.com/)
- [x] [Shadcn/UI](https://ui.shadcn.com/)
- [x] [Sonner](https://sonner.emilkowal.ski/)
- [x] [NProgress](https://ricostacruz.com/nprogress/)
- [x] [Recoil](https://recoiljs.org/)
- [x] [Moment.js](https://momentjs.com/) (for now, might be replaced with [Date-fns](https://date-fns.org/))
- [x] [Lucide Icons](https://lucide.dev/)

# How to start

## Clone the repo

Do I have to tell you how?

## Install dependencies

- run `pnpm i` to install all dependencies

## Create Clerk app

- Visit [Clerk](https://clerk.dev/) and create an account
- Create a new project
- Copy the `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` variables and paste them into `.env.local`

## Create PlanetScale database

- Visit [PlanetScale](https://planetscale.com/) and create an account
- Create a new database and set framework to [Prisma](https://www.prisma.io/)
- Copy the `DATABASE_URL` variable and paste it into `.env.local`
- run `pnpm prisma db push` to push the state of `schema.prisma` to the database

## Create Uploadthing App

- Visit [Uploadthing](https://uploadthing.com/) and create an account
- Create a new app
- Copy the `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID` variables and paste them into `.env.local`

## More env variables

Along with your Clerk, Uploadthing, and Database env variables, you will need to add the following:

```
/* TBD */
```

## Run the app

- run `pnpm dev` to start the app
- Test Clerk authentication and tRPC works by following instructions

## Start building

Happy hacking.
