import EditiorPanel from "@/components/shared/editior-panel/main-editior";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page relative flex flex-col gap-3 bg-primary">
      <Header />
      <EditiorPanel />
      <Footer />
    </main>
  );
}
