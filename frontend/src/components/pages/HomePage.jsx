import Gallery from "../ui/Gallery";
import GetStartedButton from "../ui/GetStartedButton";
import "./HomePage.css"

const HomePage = () => {
  return (
    <>
      <div className="div-first">
        <Gallery />
        <GetStartedButton />
      </div>
      <div id="first-p" className="intro-ps">
        <div>
          <h3>📱 Unleash the Power of Innovation 📱</h3>
          <p>
            At E-Phones, we're passionate about all things mobile. We understand
            that your smartphone isn't just a device; it's an extension of your
            life, your work, and your creativity. That's why we've curated a
            selection of the latest and greatest smartphones, accessories, and
            gadgets to keep you connected, entertained, and ahead of the curve.
          </p>
        </div>
      </div>
      <div id="second-p" className="intro-ps">
        <div>
          <h3>🌟 Why Choose E-Phones? 🌟</h3>
          <p>
            Unrivaled Selection: Discover the widest range of smartphones from
            all major brands. Whether you're an Apple aficionado, a Samsung
            supporter, or an Android enthusiast, we've got the perfect device
            for you.
          </p>
        </div>
      </div>
      <div id="third-p" className="intro-ps">
        <div>
          <h3>🌐 Stay Ahead of the Tech Curve 🌐</h3>
          <p>
            Technology evolves, and so do we. Keep an eye on our blog for the
            latest tech trends, how-to guides, and expert reviews. We're your
            trusted source for staying ahead of the curve in the fast-paced
            world of mobile innovation.
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
