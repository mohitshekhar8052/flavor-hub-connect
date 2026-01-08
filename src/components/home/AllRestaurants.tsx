import RestaurantCard from '@/components/restaurant/RestaurantCard';
import { restaurants } from '@/data/restaurants';

const AllRestaurants = () => {
  return (
    <section id="all-restaurants" className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">All Restaurants</h2>
          <p className="text-muted-foreground mt-1">{restaurants.length} restaurants near you</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllRestaurants;
