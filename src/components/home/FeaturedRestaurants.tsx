import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import { restaurants } from '@/data/restaurants';

const FeaturedRestaurants = () => {
  const featuredRestaurants = restaurants.filter(r => r.featured).slice(0, 3);

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Featured Restaurants</h2>
            <p className="text-muted-foreground mt-1">Our top picks for you</p>
          </div>
          <Link to="/restaurants">
            <Button variant="ghost" className="gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
