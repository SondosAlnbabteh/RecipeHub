import React from 'react';
import { Star } from 'lucide-react';
import useFetch from '../../hooks/useFetch';

const DishCard = ({ title, description, images, orderCount }) => (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-[1.02] hover:shadow-xl">
      <img src={images[0]} alt={title} className="object-cover w-full h-64" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black via-transparent to-transparent">
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
  
      </div>
      <div className="absolute flex space-x-1 top-4 right-4">
        <StarRating rating={Math.min(5, Math.floor(orderCount / 10))} />
      </div>
    </div>
  );
  

const StarRating = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5`}
        style={{ 
          fill: i < rating ? '#FBBF24' : 'none', 
          stroke: i < rating ? '#FBBF24' : 'none'
        }}
      />
    ))}
  </div>
);

const TopRatedRecipes = () => {
  const { data: dishes, loading, error } = useFetch('http://localhost:1001/api/recipe');
  

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  const sortedDishes = Array.isArray(dishes) ? dishes.sort((a, b) => b.orderCount - a.orderCount) : [];
  const mainDish = sortedDishes[0];
  const topRatedRecipes = sortedDishes.slice(1, 7);

  return (
    <div className="container mx-auto px-4 py-20 bg-[#e2ceb1] bg-opacity-10">
      <div className="max-w-6xl mx-auto">
        {mainDish && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-[#b0956e]">Highest Rated Recipe</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <DishCard {...mainDish} />
              </div>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-2xl font-semibold mb-4 text-[#b0956e] text-center">Top Rated Recipes</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topRatedRecipes.map((dish) => (
              <DishCard key={dish._id} {...dish} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRatedRecipes;