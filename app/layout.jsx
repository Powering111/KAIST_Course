import './global.css'
export default async function RootLayout({ children }) {
  
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
  }
