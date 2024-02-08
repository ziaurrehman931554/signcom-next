import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Logout from '../app/logout';

export default async function logButton() {
  const session = await getServerSession();
  return (
        <div>
          {!!session && <Logout />}
          {!session && <Link href="/login">Login</Link>}
        </div>
  );
}