import { SidebarNav } from "@/components/SidebarNav";
import { TopNavbar } from "@/components/TopNavbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <TopNavbar />
        <main className="flex-1 bg-white">{children}</main>
      </div>
    </div>
  );
}
