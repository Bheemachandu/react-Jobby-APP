import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Navbar = props => {
  console.log('bhmsv')
  const logoutUser = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="navbarContainer">
      <li>
        <Link className="LinkEl" to="/">
          <img
            className="website-logo-img"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>
      </li>
      <li>
        <div className="homeJobMenuContainer">
          <Link className="LinkEl" to="/">
            <h1 className="navbarHeading">Home</h1>
          </Link>
          <Link className="LinkEl" to="/jobs">
            <h1 className="navbarHeading">Jobs</h1>
          </Link>
        </div>
      </li>
      <li>
        <button onClick={logoutUser} className="navbarBtn" type="button">
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Navbar)
