import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { ClerkProvider, useUser } from '@clerk/tanstack-react-start'
import { PostHogProvider, usePostHog } from '@posthog/react'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

import Navbar from '../components/Navbar.tsx'
import Crosshair from '../components/Crosshair.tsx';

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Skilled - The Registry for Agentic Intelligence',
      },
      {
        name: "description",
        content: "Discover, publish and operate reusable agent capabilities from a route-driven workspace."
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  errorComponent: RootErrorComponent,
})

function RootErrorComponent({ error }: { error: Error }) {
  const posthog = usePostHog()

  useEffect(() => {
    posthog.captureException(error)
  }, [error, posthog])

  return <p>Something went wrong. Please refresh the page and try again.</p>
}

function PostHogUserIdentification() {
  const posthog = usePostHog()
  const { isLoaded, user } = useUser()
  const previousUserId = useRef<string | null>(null)

  useEffect(() => {
    if (!isLoaded) return

    const userId = user?.id ?? null

    if (!userId) {
      if (previousUserId.current) {
        posthog.reset()
        previousUserId.current = null
      }
      return
    }

    if (previousUserId.current === userId) return

    if (previousUserId.current) {
      posthog.reset()
    }

    const personProperties: Record<string, string> = {}
    const email = user.primaryEmailAddress?.emailAddress

    if (email) personProperties.email = email
    if (user.fullName) personProperties.name = user.fullName

    posthog.identify(userId, personProperties)
    previousUserId.current = userId
  }, [isLoaded, posthog, user])

  return null
}

function PostHogClientProvider({ children }: { children: React.ReactNode }) {
  const apiKey = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN
  const apiHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST

  if (!apiKey) {
    if (import.meta.env.DEV) {
      throw new Error(
        'VITE_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_PUBLIC_POSTHOG_PROJECT_TOKEN is configured',
      )
    }

    return children
  }

  if (!apiHost) {
    if (import.meta.env.DEV) {
      throw new Error(
        'VITE_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_PUBLIC_POSTHOG_HOST is configured',
      )
    }

    return children
  }

  return (
    <PostHogProvider
      apiKey={apiKey}
      options={{
        api_host: apiHost,
        capture_exceptions: true,
        defaults: '2025-05-24',
        debug: import.meta.env.DEV,
      }}
    >
      {children}
    </PostHogProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap-anywhere">
        <PostHogClientProvider>
          <ClerkProvider>
          <PostHogUserIdentification />
          <div id="root-layout">
            <header>
              <div className="frame">
                <Navbar />
                <Crosshair />
                <Crosshair />
              </div>
            </header>
            
            <main>
              <div className="frame">
                {children}
              </div>
            </main>
          </div>

          
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
          </ClerkProvider>
        </PostHogClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
