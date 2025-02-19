双Token无感刷新项目
项目简介
本项目旨在实现一个基于双token认证机制的无感刷新功能，解决传统单token机制中频繁刷新token的问题。通过使用两个token（访问token和刷新token）和定时刷新策略，确保用户的登录状态持续有效且不需要频繁的重新认证。

功能特点
双Token机制：使用一个访问token和一个刷新token，访问token用于验证用户请求，刷新token用于刷新访问token。
无感刷新：用户在使用过程中，访问token即将过期时，后台会自动使用刷新token更新访问token，无需用户手动重新登录。
自动过期控制：访问token和刷新token都具有过期时间，并且提供自动更新的机制，确保系统安全性。
安全性：访问token和刷新token采用JWT（JSON Web Token）标准，并使用加密算法保护token的完整性。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
