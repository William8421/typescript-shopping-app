import aboutBackground from '../imgs/aboutBackground.jpg'
import MERN from '../imgs/MERN.png'
export default function About() {
  return (
    <div className="about-container">
      <div className="mission">
        <img src={aboutBackground} alt="" />
        <h2>Our Mission</h2>
        <h5>
          Our mission is to create a dynamic and user-friendly marketplace where
          buyers and sellers can connect with ease. We aim to empower
          individuals to discover, purchase, and sell products in a secure and
          efficient environment.
        </h5>
      </div>
      <div className="features-container">
        <h2>Features</h2>
        <h5>
          Shopping App offers a range of features to enhance your shopping
          experience:
        </h5>
        <div className="features">
        <p>
          <strong>Authentication:</strong>{" "}
          <span>
            Securely sign up and log in to access personalized features.
          </span>
        </p>
        <p>
          <strong>Shopping Cart Management: </strong>{" "}
          <span>
            Easily add or remove items from your shopping cart with just a few
            clicks.
          </span>
        </p>
        <p>
          <strong>User-friendly Interface:</strong>{" "}
          <span>
            Our intuitive interface makes navigating through products and
            managing your account a breeze.
          </span>
        </p>
        <p>
          <strong>Seller Options:</strong>{" "}
          <span>
            Sign up as a seller to list, edit, and delete your own products,
            reaching a broader audience.
          </span>
        </p>
        <p>
          <strong>Store Page:</strong>{" "}
          <span>
            Explore our store page to discover a diverse range of products
            available for purchase by everyone.
          </span>
        </p>
        </div>
      </div>
      <div className="how-it-works-container">
        <h2>How It Works</h2>
        <ul>
        <li>
          <strong>Sign Up/Log In:</strong>{" "}
          <span>Create an account or log in to access all the features.</span>
        </li>
        <li>
          <strong>Browse Products:</strong>{" "}
          <span>
            Explore our store page to find products that interest you.
          </span>
        </li>
        <li>
          <strong>Add to Cart:</strong>{" "}
          <span>
            Simply click on items you want to purchase to add them to your
            shopping cart.
          </span>
        </li>
        <li>
          <strong>Manage Cart:</strong>{" "}
          <span>
            Review, edit, or remove items from your shopping cart as needed.
          </span>
        </li>
        <li>
          <strong>Checkout:</strong>{" "}
          <span>Complete your purchase securely and efficiently.</span>
        </li>
        <li>
          <strong>Become a Seller:</strong>{" "}
          <span>
            Interested in selling your own products? Sign up as a seller to
            start listing and managing your inventory.
          </span>
        </li>
        </ul>
      </div>
      <div className="technologies-used-container">
        <h2>Built with Cutting-Edge Technologies</h2>
        <h5>
          Shopping App is built using modern technologies to ensure a smooth and robust
            user experience. Here are the key technologies powering our
            platform:
        </h5>
        <img src={MERN} alt="" />
        <div className="technologies">
        <p>
          <strong>Node.js/Express:</strong>{" "}
          <span>
            Our backend is powered by Node.js, a lightweight and efficient
            JavaScript runtime, along with Express.js, a web application
            framework for Node.js, enabling us to build scalable and
            high-performance server-side applications.
          </span>
        </p>
        <p>
          <strong>MongoDB:</strong>{" "}
          <span>
            We utilize MongoDB, a NoSQL database, to store and manage our app's
            data. MongoDB's flexible schema and scalability make it ideal for
            handling various types of data, including user information, product
            listings, and shopping cart details.
          </span>
        </p>
        <p>
          <strong>TypeScript:</strong>{" "}
          <span>
            We leverage TypeScript, a superset of JavaScript, to bring static
            typing and other advanced features to our codebase. TypeScript
            enhances code maintainability, readability, and productivity, making
            it easier to build and maintain complex applications.
          </span>
        </p>
        <p>
          <strong>React:</strong>{" "}
          <span>
            Our frontend is built with React, a popular JavaScript library for
            building user interfaces. React's component-based architecture and
            virtual DOM enable us to create interactive and responsive UIs,
            providing a seamless shopping experience for our users.
          </span>
        </p>
        </div>
      </div>
    </div>
  );
}
