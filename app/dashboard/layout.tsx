import DashboardHeader from "@/components/layout/DashboardHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-stable-primary">
      <DashboardHeader />
      {children}
    </main>
  );
}
