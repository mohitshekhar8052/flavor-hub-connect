import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CheckCircle, Package, Clock, MapPin, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state || {};

  // Redirect to orders if no state is present
  useEffect(() => {
    if (!location.state || !orderData.orderId) {
      navigate('/orders', { replace: true });
    }
  }, [location.state, orderData.orderId, navigate]);

  if (!orderData.orderId) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
            <p className="text-muted-foreground">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-card rounded-2xl shadow-card p-6 mb-6">
            <div className="flex items-center justify-between mb-6 pb-6 border-b">
              <div>
                <h2 className="text-lg font-bold">Order Details</h2>
                <p className="text-sm text-muted-foreground">
                  Order ID: #{orderData.orderId || 'N/A'}
                </p>
              </div>
              <div className="px-4 py-2 bg-warning/10 text-warning rounded-lg font-medium">
                Preparing
              </div>
            </div>

            {/* Restaurant Info */}
            <div className="flex items-start gap-3 mb-6">
              <Package className="w-5 h-5 text-primary mt-1" />
              <div className="flex-1">
                <p className="font-medium">From</p>
                <p className="text-muted-foreground">{orderData.restaurantName || 'Restaurant'}</p>
              </div>
            </div>

            {/* Estimated Delivery */}
            <div className="flex items-start gap-3 mb-6">
              <Clock className="w-5 h-5 text-primary mt-1" />
              <div className="flex-1">
                <p className="font-medium">Estimated Delivery</p>
                <p className="text-muted-foreground">30-45 minutes</p>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div className="flex-1">
                <p className="font-medium">Delivering to</p>
                <p className="text-muted-foreground">
                  {orderData.address || 'Your delivery address'}
                </p>
              </div>
            </div>

            {/* Order Total */}
            <div className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-primary mt-1" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">Total Amount</p>
                  <p className="font-bold text-lg">
                    ₹{orderData.total || '0'}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Payment: {orderData.paymentMethod || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Order Tracking Timeline */}
          <div className="bg-card rounded-2xl shadow-sm p-6 mb-6">
            <h3 className="font-bold mb-4">Order Tracking</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Order Placed</p>
                  <p className="text-sm text-muted-foreground">Just now</p>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Preparing</p>
                  <p className="text-sm text-muted-foreground">In progress</p>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-30">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">On the way</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-30">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Delivered</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Browse More
              </Button>
            </Link>
            <Link to="/orders" className="flex-1">
              <Button variant="hero" className="w-full">
                View All Orders
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
