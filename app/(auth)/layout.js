import Navbar from "@/components/Navbar";
import "../globals.css";

export const metadata = {
  title: "Stay Swift",
  description: "A hotel booking website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar sideMenu={false} />
        {children}
      </body>
    </html>
  );
}
