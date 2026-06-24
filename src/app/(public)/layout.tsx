 
import PublicHeader from '@/components/landing/PublicHeader';
import Footer from '@/components/landing/Footer';  
 
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
 
      <PublicHeader />

      
      <main className="flex-1">
        {children}
      </main>

 
      <Footer />
    </div>
  );
}