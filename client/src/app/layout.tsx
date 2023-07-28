import { Inter } from "next/font/google";
import { UserProvider } from "@/hooks/userContext";
import "../sass/global.scss";
import "../sass/fonts/fonts.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TaskFlow",
  description:
    "Stay organized and manage your tasks efficiently with this simple Task Manager. Create an account, add tasks, set priorities, and never miss a deadline again. Sign up now!",
  icons: {
    icon: "/friend3.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <html lang="en" className={inter.className}>
        <body>
          <main className="main">{children}</main>
        </body>
      </html>
    </UserProvider>
  );
}
