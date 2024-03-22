import { SessionProvider } from 'next-auth/react'
import { auth } from './auth';
export async function Providers({ children }) {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
