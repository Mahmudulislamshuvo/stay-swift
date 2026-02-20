import "./globals.css";

export const metadata = {
  title: "Stay Swift",
  description: "A hotel booking website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
