
import {  Raleway} from "next/font/google";
import "./globals.css";
import Header from "../components/shared/header";
import { ThemeProvider } from "../components/theme-provider";
import Footer from "../components/shared/footer";
 
const raleway = Raleway({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={raleway.className + "h-full w-full flex flex-1 flex-col"}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Header/>
        {children}
        <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
