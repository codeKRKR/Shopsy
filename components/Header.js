import SearchBar from './SearchBar';
import CategorySelector from './CategorySelector';

const Header = () => {
  return (
    <nav className="navbar">
      <div style={{lineHeight:'2rem', marginLeft:'1rem'}}>
        <h1 style={{lineHeight:'2rem'}} className='companyName'>Shopsy</h1>
      </div>
      <SearchBar/>
      <CategorySelector/>
    </nav>
  );
};

export default Header;