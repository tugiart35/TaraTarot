import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to Turkish locale by default
  redirect('/tr');
}
