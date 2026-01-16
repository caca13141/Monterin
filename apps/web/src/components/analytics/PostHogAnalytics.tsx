'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function PostHogAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
        const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

        if (!POSTHOG_KEY || typeof window === 'undefined') return;

        // Dynamically import PostHog
        import('posthog-js').then((posthog) => {
            if (!posthog.default.has_opted_out_capturing()) {
                posthog.default.init(POSTHOG_KEY, {
                    api_host: POSTHOG_HOST,
                    loaded: (ph) => {
                        if (process.env.NODE_ENV === 'development') ph.debug();
                    },
                    capture_pageview: false, // We'll handle manually
                });
            }
        });
    }, []);

    useEffect(() => {
        // Track page views
        if (typeof window !== 'undefined') {
            import('posthog-js').then((posthog) => {
                // Determine if loaded by checking if we optionally opted out or simple try/catch
                // For simplicity, just capture. PostHog client queues events if not ready.
                posthog.default.capture('$pageview');
            });
        }
    }, [pathname, searchParams]);

    return null;
}
