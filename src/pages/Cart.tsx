import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCartContext } from '@/contexts/CartContext';
import { getRestaurantById } from '@/data/restaurants';

const Cart = () => {
  const { cart, updateQuantity, removeItem, clearCart, getSubtotal, validateMinimumOrder, isRestaurantClosed, restaurantStatus } = useCartContext();
  const navigate = useNavigate();
  
  const subtotal = getSubtotal();
  const deliveryFee = cart.items.length > 0 ? 40 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  // Get restaurant details for minimum order
  const restaurant = cart.restaurantId ? getRestaurantById(cart.restaurantId) : null;
  const minOrder = restaurant?.minOrder || 0;
  const isMinOrderMet = subtotal >= minOrder;
  const restaurantClosed = isRestaurantClosed();

  const handleProceedToCheckout = () => {
    if (!isMinOrderMet) {
      validateMinimumOrder(minOrder);
      return;
    }
    navigate('/checkout');
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Add some delicious items from our restaurants to get started
            </p>
            <Link to="/">
              <Button variant="hero" size="lg">
                Browse Restaurants
              </Button>
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
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Your Cart</h1>
              <p className="text-muted-foreground">
                {cart.items.length} item{cart.items.length > 1 ? 's' : ''} from {cart.restaurantName}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Warning for closed restaurant */}
              {restaurantClosed && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {restaurant?.name} is currently closed. Your order may not be processed until they reopen.
                  </AlertDescription>
                </Alert>
              )}

              {/* Warning for minimum order */}
              {!isMinOrderMet && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Minimum order amount is ₹{minOrder}. Add ₹{(minOrder - subtotal).toFixed(0)} more to proceed.
                  </AlertDescription>
                </Alert>
              )}

              {cart.items.map((item) => (
                <div
                  key={item.menuItem.id}
                  className="flex gap-4 p-4 bg-card rounded-xl shadow-sm"
                >
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {item.menuItem.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {item.menuItem.description}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.menuItem.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 bg-muted rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                          className="p-2 hover:bg-muted/80 transition-colors rounded-l-lg"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                          className="p-2 hover:bg-muted/80 transition-colors rounded-r-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="font-bold text-lg">
                        ₹{(item.menuItem.price * item.quantity).toFixed(0)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="ghost"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={clearCart}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl shadow-card p-6 sticky top-24">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="font-medium">₹{deliveryFee.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">₹{tax.toFixed(0)}</span>
                  </div>
                  
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{total.toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full mt-6"
                  disabled={!isMinOrderMet || restaurantClosed}
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </Button>

                {!isMinOrderMet && (
                  <p className="text-xs text-destructive text-center mt-2">
                    ₹{(minOrder - subtotal).toFixed(0)} more to meet minimum order
                  </p>
                )}

                {restaurantClosed && (
                  <p className="text-xs text-destructive text-center mt-2">
                    Restaurant is currently closed
                  </p>
                )}

                <p className="text-xs text-muted-foreground text-center mt-4">
                  By placing your order, you agree to our Terms of Service
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
