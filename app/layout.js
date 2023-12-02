import { Inter, Jost } from "next/font/google";
import { siteName, siteTag } from "./META";
import { UIProvider } from "./Support/UIProvider";
import "./globals.css";
import "./CroperCss.css";

import NavBar from "./Support/Componets/Header/NavBar";
import Footer from "./Support/Componets/Footer";
import { GlobalWrapper } from "../StateManager/GlobalContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
const jost = Jost({ subsets: ["latin"] });

export const metadata = {
  title: siteName,
  description: siteTag,
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="http://localhost:8097"></script>
        <link
          rel="icon"
          href="public/Images/371104266_1371705300076286_136258277339424492_n.jpeg"
        />
        <script src="https://js.verygoodvault.com/vgs-show/1.5/ACh8JJTM42LYxwe2wfGQxwj5.js"></script>
        <script async src="https://ui.s.unit.sh/release/latest/components.js"></script>

      </head>
      <body className={jost.className}>


        <UIProvider>
          <GlobalWrapper>
            <NavBar />
            {children}
          </GlobalWrapper>
        </UIProvider>
      </body>
    </html>
  );
}
