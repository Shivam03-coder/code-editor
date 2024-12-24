import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page relative flex flex-col bg-primary">
      <Header />
      <Footer />
    </main>
  );
}
