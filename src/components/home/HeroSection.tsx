import { ArrowRight, Clock, Star, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-60 -left-20 w-60 h-60 rounded-full bg-warning/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Truck className="w-4 h-4" />
              Free delivery on first order
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Delicious Food,{' '}
              <span className="text-gradient">Delivered Fast</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              Order from your favorite restaurants and get food delivered to your doorstep in minutes. Fresh, hot, and always on time.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/restaurants">
                <Button variant="hero" size="xl">
                  Order Now
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              <Button variant="outline" size="xl">
                View Restaurants
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">4.8+</p>
                  <p className="text-xs text-muted-foreground">App Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-bold text-foreground">500+</p>
                  <p className="text-xs text-muted-foreground">Restaurants</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="font-bold text-foreground">25 min</p>
                  <p className="text-xs text-muted-foreground">Avg. Delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in hidden lg:block">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
                alt="Delicious food spread"
                className="rounded-3xl shadow-2xl w-full object-cover aspect-square"
              />
              
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-card p-4 animate-bounce-subtle">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&q=80"
                    alt="Burger"
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">Classic Burger</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-warning fill-warning" />
                      <span className="text-xs text-muted-foreground">4.9 • 15 min</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Another floating card */}
              <div className="absolute -top-4 -right-4 bg-card rounded-2xl shadow-card p-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                    <span className="text-success text-lg">✓</span>
                  </div>
                  <span className="text-sm font-medium">Order Delivered!</span>
                </div>
              </div>
            </div>

            {/* Background decoration for image */}
            <div className="absolute top-10 right-10 w-full h-full bg-primary/20 rounded-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
