import tecgLogos from '../imgs/techLogos.png'
export default function About() {
  return (
    <div className="about-container">
      <div className="about-app">
          <h2>About the App</h2>
          <div>
            Shopping Cart App is an E-Commerce Application that allows users to buy products without the need to sign up.
            signing up allows them to sell their products as well as buying other's products.
          </div>
      </div>
      <div className="about-project">
        <h2>About the Project</h2>
        <div>
          shopping Cart App is a fullstack project, created with React-Typescript.
        </div>
      </div>
      <div className="technologies-used">
        <h2>Technologies Used</h2>
        <div>Typescript, MongoDB, Express, React, NodeJs, BCryptJs and JWT.</div>
        <img className='logos' src={tecgLogos} alt="logos" />
      </div>
    </div>
  )
}
