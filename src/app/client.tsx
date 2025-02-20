// 'use client';

// import { I18nProviderClient } from "@/locales/client";
// import { RootLayoutProps } from "./layout";
// import { Toaster } from "@/components/ui/sonner";
// import { useRouter } from "next/navigation";
// import { setupAxiosInterceptors } from "@/api/auth/index";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

// export const RootLayoutClient = ({ children, params: { locale } }: RootLayoutProps) => {
//     const router = useRouter();
//     setupAxiosInterceptors(router);

//     return (
//         <html lang={locale}>
//             <body>
//                 <main>
//                     <I18nProviderClient locale={locale}>
//                         <QueryClientProvider client={queryClient}>
//                             {children}
//                         </QueryClientProvider>
//                     </I18nProviderClient>
//                     <div id="root"></div>
//                 </main>
//                 <Toaster position="bottom-center" />
//             </body>
//         </html>
//     );
// }
