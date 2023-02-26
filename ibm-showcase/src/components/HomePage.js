import './HomePage.css';
import Header from './Header'
import HomeBody from './HomeBody'
import HomeAbout from './HomeAbout'


function HomePage() {
  return (
    <div className="HomePage">
      <Header />
      <HomeBody />
      {/*<HomeAbout />*/}
    </div>
  );
}

export default HomePage;