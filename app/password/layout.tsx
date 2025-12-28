import { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Access Required",
  description: "Enter the access code to continue",
};

export default function PasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}

