import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import FeaturedRestaurants from '@/components/home/FeaturedRestaurants';
import AllRestaurants from '@/components/home/AllRestaurants';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CategorySection />
        <FeaturedRestaurants />
        <AllRestaurants />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
