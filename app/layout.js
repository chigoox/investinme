import { Inter, Jost } from 'next/font/google'
import { siteName, siteTag } from './META'
import { UIProvider } from './Support/UIProvider'
import './globals.css'
import './CroperCss.css'

import NavBar from './Support/Componets/Header/NavBar'
import Footer from './Support/Componets/Footer'
import {   GlobalWrapper } from '../StateManager/GlobalContext'


const inter = Inter({ subsets: ['latin'] })
const jost = Jost({ subsets: ['latin'] })

export const metadata = {
  title: siteName,
  description: siteTag,
}


export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="http://localhost:8097"></script>
        <link rel='icon' href='public/Images/371104266_1371705300076286_136258277339424492_n.jpeg' />
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
  )
}


