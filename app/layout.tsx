import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Ajay | Full-Stack & AI Solutions Developer",
  description: "I build scalable web applications, modern dashboards and practical AI-powered solutions using React, Next.js, Node.js and modern AI technologies."
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
