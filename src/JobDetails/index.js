import Cookies from 'js-cookie'
import {Component} from 'react'
import {FaExternalLinkAlt} from 'react-icons/fa'
import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import './index.css'
import Navbar from '../Navbar'
import Skills from '../Skills'
import SimilarJobsCard from '../SimilarJobsCard'

const jobDetailsApiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class JobDetails extends Component {
  state = {jobDetailsStatus: '', jobDetails: '', similarJobs: ''}

  componentDidMount() {
    this.getJobDetails()
  }

  formatJobDetails = job => ({
    companyLogoUrl: job.company_logo_url,
    companyWebsiteUrl: job.company_website_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    lifeAtCompany: job.life_at_company,
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
    skills: job.skills,
    title: job.title,
    similarJobs: job.similar_jobs,
  })

  getJobDetails = async () => {
    this.setState({jobDetailsStatus: jobDetailsApiStatus.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const JobDetailsOptions = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobDetailsUrl, JobDetailsOptions)
    const data = await response.json()
    console.log('response')

    console.log(data)
    const updatedjobDetails = this.formatJobDetails(data.job_details)

    console.log(updatedjobDetails)
    if (response.ok) {
      this.setState({
        jobDetailsStatus: jobDetailsApiStatus.success,
        jobDetails: updatedjobDetails,
        similarJobs: data.similar_jobs,
      })
    } else {
      this.setState({jobDetailsStatus: jobDetailsApiStatus.failure})
    }
  }

  renderLoader = () => (
    <div
      className="loader-container similarJobsLoaderContainer"
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {jobDetails, similarJobs} = this.state
    console.log(jobDetails.image_url)
    console.log(jobDetails)
    return (
      <div className="JobDetails">
        <div className="jobCardContainer">
          <div className="titleContainer">
            <img
              className="job details company logo"
              alt="job details company logo"
              src={jobDetails.companyLogoUrl}
            />
            <div className="titelRatingContainer">
              <h1 className="jobTitle">{jobDetails.title}</h1>
              <div className="ratingContainer">
                <IoIosStar className="starIcon" />
                <p className="ratingText">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="locationContainer">
            <div className="locationInnerContainer">
              <MdLocationOn />
              <p className="locationText">{jobDetails.location}</p>
              <MdLocationOn />
              <p>{jobDetails.employmentType}</p>
            </div>
            <p>{jobDetails.packagePerAnnum}</p>
          </div>
          <hr />
          <div className="ancherTagContainer">
            <h1 className="descriptionHeading">Description</h1>
            <a
              className="ancherEl"
              target="_blank"
              rel="noreferrer"
              href={jobDetails.companyWebsiteUrl}
            >
              Visit <FaExternalLinkAlt />
            </a>
          </div>
          <p className="descriptionpara">{jobDetails.jobDescription}</p>
          <h1 className="skillsHeading">Skills</h1>
          <ul className="skillsUpperContainer">
            {jobDetails.skills.map(item => (
              <Skills skillsDetails={item} key={item.name} />
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div className="lifeAtCompanyContainer">
            <p>{jobDetails.lifeAtCompany.description}</p>
            <img
              alt="life at company"
              src={jobDetails.lifeAtCompany.image_url}
            />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul className="similarJobsContainer">
          {similarJobs.map(item => (
            <SimilarJobsCard similarJobDetails={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  retryJobsDetails = () => {
    this.getJobDetails()
  }

  renderFailure = () => (
    <div className="jobDetailsFilureContainer">
      <div className="jobDetailsFailureinnerContainer">
        <img
          className="failureJobsDetailsImg"
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
      </div>
      <button
        onClick={this.retryJobsDetails}
        className="failureBtn"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {jobDetailsStatus} = this.state
    switch (jobDetailsStatus) {
      case jobDetailsApiStatus.success:
        return this.renderSuccess()
      case jobDetailsApiStatus.failure:
        return this.renderFailure()
      case jobDetailsApiStatus.inprogress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    console.log('match')

    return (
      <div className="jobDetailsContainer">
        <Navbar />
        <div className="jobDetailsLowerContainer">
          {this.renderJobDetails()}
        </div>
      </div>
    )
  }
}

export default JobDetails
