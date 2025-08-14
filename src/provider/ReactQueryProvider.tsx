"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;

// import { QueryClientProvider, QueryClient, dehydrate, hydrate } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

// const PERSIST_KEY = "rq-cache-v1";
// const DAY_MS = 24 * 60 * 60 * 1000;

// const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
//   const [queryClient] = useState(() => new QueryClient());

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     try {
//       const raw = localStorage.getItem(PERSIST_KEY);
//       if (raw) {
//         const parsed = JSON.parse(raw) as { savedAt: number; state: unknown };
//         if (parsed?.savedAt && Date.now() - parsed.savedAt < DAY_MS && parsed?.state) {
//           hydrate(queryClient, parsed.state);
//         } else {
//           localStorage.removeItem(PERSIST_KEY);
//         }
//       }
//     } catch {
//       // ignore
//     }

//     const save = () => {
//       try {
//         const state = dehydrate(queryClient);
//         localStorage.setItem(
//           PERSIST_KEY,
//           JSON.stringify({ savedAt: Date.now(), state })
//         );
//       } catch {
//         // ignore
//       }
//     };

//     const unsubscribe = queryClient.getQueryCache().subscribe(save);
//     window.addEventListener("beforeunload", save);
//     document.addEventListener("visibilitychange", () => {
//       if (document.visibilityState === "hidden") save();
//     });

//     return () => {
//       unsubscribe();
//       window.removeEventListener("beforeunload", save);
//     };
//   }, [queryClient]);

//   return (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// };

// export default ReactQueryProvider;