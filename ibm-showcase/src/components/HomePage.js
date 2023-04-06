import './HomePage.css';
import Header from './Header'
import HomeBody from './HomeBody'
import HomeAbout from './HomeAbout'
import Footer from './Footer'


function HomePage() {
  return (
    <div className="HomePage" >
      <div className="HomeBody">
        <Header />
        <HomeBody />
      </div> 
      <HomeAbout />
      <Footer />
    </div>
  );
}  

export default HomePage;