import { Link } from 'react-router-dom';
import { Star, Clock, Bike } from 'lucide-react';
import { Restaurant } from '@/types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link 
      to={`/restaurant/${restaurant.id}`}
      className="group block bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay badges */}
        {restaurant.featured && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-primary text-primary-foreground text-xs font-semibold">
            Featured
          </div>
        )}
        
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="px-4 py-2 bg-card rounded-lg text-sm font-semibold">
              Currently Closed
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 gradient-overlay" />
        
        {/* Delivery time badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md bg-card/90 backdrop-blur-sm text-xs font-medium">
          <Clock className="w-3 h-3" />
          {restaurant.deliveryTime}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
          {restaurant.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
          {restaurant.cuisine.join(' • ')}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-warning fill-warning" />
            <span className="font-semibold text-sm">{restaurant.rating}</span>
            <span className="text-xs text-muted-foreground">({restaurant.reviewCount})</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Bike className="w-4 h-4" />
            <span>${restaurant.deliveryFee.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-2 text-xs text-muted-foreground">
          {restaurant.distance} away • Min ${restaurant.minOrder}
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
