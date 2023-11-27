import {withRouter, Link} from 'react-router-dom'

import Navbar from '../Navbar'
import './index.css'

const Home = props => {
  console.log(',mb')
  const ChangeToJobsPage = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div className="homeContainer">
      <Navbar />
      <div className="HomeContentContainer">
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs,salary information,company
          reviews.Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button onClick={ChangeToJobsPage} className="homeBtn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default withRouter(Home)
