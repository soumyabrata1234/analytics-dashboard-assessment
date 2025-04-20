
import './globals.css'; 
import Sidebar from './components/Sidebar';
import Navbar from './components/navbar';
import { DataProvider } from './DataContext'; 

export const metadata = {
  title: 'Electric Vehicle Dashboard',
  description: 'Next.js Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-screen">
        <DataProvider> {}
          <Sidebar />
          <main className="flex-1 flex flex-col">
            <Navbar />
            <section className="p-6 overflow-y-auto flex-1 bg-gray-100">
              {children}
            </section>
          </main>
        </DataProvider>
      </body>
    </html>
  );
}