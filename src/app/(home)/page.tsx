import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page text-main flex flex-col bg-primary">
      <UserButton />
    </main>
  );
}
