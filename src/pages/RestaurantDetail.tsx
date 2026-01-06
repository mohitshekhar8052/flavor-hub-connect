import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Bike, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MenuItemCard from '@/components/menu/MenuItemCard';
import { dataProvider } from '@/lib/dataProvider';
import { useMemo, useEffect, useState } from 'react';
import { Restaurant, MenuItem } from '@/types';

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | undefined>();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [restaurantData, menuData] = await Promise.all([
          dataProvider.getRestaurantById(id),
          dataProvider.getMenuByRestaurantId(id),
        ]);
        setRestaurant(restaurantData || undefined);
        setMenuItems(menuData);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const menuByCategory = useMemo(() => {
    return menuItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, typeof menuItems>);
  }, [menuItems]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
            <Link to="/">
              <Button variant="hero">Go back home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-overlay" />
          
          {/* Back button */}
          <Link to="/" className="absolute top-4 left-4">
            <Button variant="secondary" size="icon" className="rounded-full bg-card/90 backdrop-blur-sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Restaurant Info */}
        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="bg-card rounded-2xl shadow-card p-6 mb-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {restaurant.name}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {restaurant.cuisine.join(' • ')}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-warning fill-warning" />
                    <span className="font-bold">{restaurant.rating}</span>
                    <span className="text-muted-foreground">({restaurant.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{restaurant.distance}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
                <Bike className="w-5 h-5 text-secondary-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Delivery Fee</p>
                  <p className="font-bold text-secondary-foreground">₹{restaurant.deliveryFee.toFixed(0)}</p>
                </div>
              </div>
            </div>

            {!restaurant.isOpen && (
              <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm font-medium">
                This restaurant is currently closed
              </div>
            )}
          </div>

          {/* Menu */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6">Menu</h2>
            
            {Object.entries(menuByCategory).map(([category, items]) => (
              <div key={category} className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  {category}
                </h3>
                <div className="space-y-4">
                  {items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      restaurantId={restaurant.id}
                      restaurantName={restaurant.name}
                      restaurant={restaurant}
                    />
                  ))}
                </div>
              </div>
            ))}

            {menuItems.length === 0 && (
              <div className="text-center py-12 bg-card rounded-xl">
                <p className="text-muted-foreground">No menu items available</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RestaurantDetail;
