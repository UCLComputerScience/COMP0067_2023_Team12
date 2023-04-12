import './HomePage.css';
import Header from './Header'
import HomeBody from './HomeBody'
import HomeAbout from './HomeAbout'
import Footer from './Footer'


function HomePage() {
  return (
    <div className="HomePage" >
      <div className="HomeHeader"> 
        <Header />
      </div>
      <div className="HomeBody">
        <HomeBody />
      </div>  
      <HomeAbout />
      <Footer />
    </div>
  );
}  

export default HomePage;