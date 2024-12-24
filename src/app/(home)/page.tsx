import Footer from "@/components/shared/footer";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page relative flex flex-col bg-primary">
      <UserButton />
      <Footer />
    </main>
  );
}
