import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className='main'>
      <Header/>
      <ProductList/>
    </div>
  );
};

export default Home;
