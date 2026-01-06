import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MenuItem } from '@/types';
import { useCartContext } from '@/contexts/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
  restaurantId: string;
  restaurantName: string;
}

const MenuItemCard = ({ item, restaurantId, restaurantName }: MenuItemCardProps) => {
  const { cart, addItem, updateQuantity } = useCartContext();
  
  const cartItem = cart.items.find(ci => ci.menuItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addItem(item, restaurantId, restaurantName);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex gap-4 p-4 bg-card rounded-xl shadow-sm hover:shadow-card transition-shadow">
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          {/* Veg/Non-veg indicator */}
          <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center mt-1 flex-shrink-0 ${
            item.isVeg ? 'border-success' : 'border-destructive'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              item.isVeg ? 'bg-success' : 'bg-destructive'
            }`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground">{item.name}</h3>
              {item.isBestSeller && (
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-warning/10 text-warning">
                  Bestseller
                </span>
              )}
              {item.isPopular && (
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                  Popular
                </span>
              )}
            </div>
            <p className="text-lg font-bold text-foreground mt-1">
              ${item.price.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>
      </div>

      {/* Image and Add button */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0">
        <div className="relative w-28 h-24">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        
        {quantity === 0 ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleAdd}
            className="w-28 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            ADD
            <Plus className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <div className="flex items-center gap-2 bg-primary rounded-lg overflow-hidden">
            <button
              onClick={() => handleUpdateQuantity(quantity - 1)}
              className="p-2 hover:bg-primary/80 transition-colors text-primary-foreground"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-semibold text-primary-foreground w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleUpdateQuantity(quantity + 1)}
              className="p-2 hover:bg-primary/80 transition-colors text-primary-foreground"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
