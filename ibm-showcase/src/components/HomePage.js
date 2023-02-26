import './HomePage.css';
import Header from './Header'
import HomeBody from './HomeBody'
import HomeBodyAbout from './HomeBodyAbout'


function HomePage() {
  return (
    <div className="HomePage">
      <Header />
      <HomeBody />
      <HomeBodyAbout />
    </div>
  );
}

export default HomePage;