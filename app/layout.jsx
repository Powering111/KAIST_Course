import './global.css'
import { PopupContainer } from '@/components/popup';
export default async function RootLayout({ children }) {
  
  return (
    <html lang="ko">
      <body>
        <main>
          {children}
        </main>
        <PopupContainer/>
      </body>
    </html>
  );
  }
