import { useState } from 'react';

const categories = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'burger', name: 'Burgers', icon: '🍔' },
  { id: 'sushi', name: 'Sushi', icon: '🍱' },
  { id: 'indian', name: 'Indian', icon: '🍛' },
  { id: 'chinese', name: 'Chinese', icon: '🥡' },
  { id: 'mexican', name: 'Mexican', icon: '🌮' },
  { id: 'dessert', name: 'Desserts', icon: '🍰' },
  { id: 'healthy', name: 'Healthy', icon: '🥗' },
];

interface CategorySectionProps {
  onCategoryChange?: (category: string) => void;
}

const CategorySection = ({ onCategoryChange }: CategorySectionProps) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">What are you craving?</h2>
        
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex flex-col items-center gap-2 px-5 py-4 rounded-2xl min-w-[90px] transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-card'
                  : 'bg-card hover:bg-muted shadow-sm hover:shadow-card'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
