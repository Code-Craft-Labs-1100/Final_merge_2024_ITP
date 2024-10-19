import Carousel from '../Components/Carousel';
import Categories from '../Components/Categories';
import FeaturedProducts from '../Components/FeaturedProducts';
import MostPopularProducts from '../Components/MostPopularProducts';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <div className="bg-white py-8 w-full">
        <div className="w-full px-8  mx-auto">
          <Carousel />
        </div>
      </div>

     
      
    </div>
  );
}
