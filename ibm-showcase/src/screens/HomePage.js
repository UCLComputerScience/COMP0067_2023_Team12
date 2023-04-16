import './HomePage.css';
import Header from '../components/Header'
import HomeBody from '../components/HomeBody'
import HomeAbout from '../components/HomeAbout'
import Footer from '../components/Footer'


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