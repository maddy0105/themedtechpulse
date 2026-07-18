"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function RedirectHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      router.replace(`/article/${id}`);
    } else {
      router.replace("/");
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center py-32 text-text-secondary space-y-4">
      <Loader2 className="animate-spin text-brand-primary" size={32} />
      <p className="text-sm font-semibold">Redirecting to article...</p>
    </div>
  );
}

export default function ArticleRedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-32 text-text-secondary space-y-4">
          <Loader2 className="animate-spin text-brand-primary" size={32} />
          <p className="text-sm font-semibold">Loading redirect...</p>
        </div>
      }
    >
      <RedirectHandler />
    </Suspense>
  );
}
