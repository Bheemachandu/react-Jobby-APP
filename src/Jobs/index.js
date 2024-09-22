import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Navbar from '../Navbar'
import Profile from '../Profile'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusList = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
  empty: 'EMPTY',
}

class Jobs extends Component {
  state = {
    apiStatus: '',
    filterEmploymentType: [],
    filterSalaryRange: '',
    searchText: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getJobsListDetails()
  }

  formatJobsList = item => {
    const newJobsList = item.map(dat => ({
      companyLogoUrl: dat.company_logo_url,
      employmentType: dat.employment_type,
      id: dat.id,
      jobDescription: dat.job_description,
      location: dat.location,
      packagePerAnnum: dat.package_per_annum,
      rating: dat.rating,
      title: dat.title,
    }))
    return newJobsList
  }

  renderEmpty = () => (
    <div className="jobDetailsFilureContainer emptyContainer">
      <div className="jobsListFailureCard">
        <img
          className="failureJobsListImg"
          alt="no jobs"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    </div>
  )

  getJobsListDetails = async () => {
    this.setState({apiStatus: apiStatusList.inprogress})
    const {filterEmploymentType, filterSalaryRange, searchText} = this.state
    const employmentType = filterEmploymentType.join(',')
    console.log(employmentType)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${filterSalaryRange}&search=${searchText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response.ok)
    console.log('Zero data')
    console.log(data)
    console.log(data.total)
    if (response.ok) {
      if (data.total !== 0) {
        console.log(data)
        const updateJobsData = this.formatJobsList(data.jobs)
        console.log(updateJobsData)
        this.setState({
          apiStatus: apiStatusList.success,
          jobsList: updateJobsData,
        })
      } else {
        this.setState({apiStatus: apiStatusList.empty})
      }
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  updateEmploymentType = type => {
    const {filterEmploymentType} = this.state
    if (filterEmploymentType.includes(type)) {
      const newList = filterEmploymentType.filter(item => type !== item)
      this.setState({filterEmploymentType: newList}, this.getJobsListDetails)
    } else {
      const newList = [...filterEmploymentType, type]
      this.setState({filterEmploymentType: newList}, this.getJobsListDetails)
    }
  }

  updateSalaryRange = range => {
    this.setState({filterSalaryRange: range}, this.getJobsListDetails)
  }

  renderEmployment = () => {
    console.log('jmnm')
    return (
      <div className="emplomentTypeMainContainer">
        <h1 className="employmentTypeHeading">Type of Employment</h1>
        {employmentTypesList.map(item => (
          <EmploymentType
            updateEmploymentType={this.updateEmploymentType}
            key={item.label}
            employmentDetails={item}
          />
        ))}
      </div>
    )
  }

  renderSalaryRange = () => {
    console.log('hvnbv')
    return (
      <div className="emplomentTypeMainContainer">
        <h1 className="salaryRangeHeading">Salary Range</h1>
        {salaryRangesList.map(item => (
          <SalaryRange
            updateSalaryRange={this.updateSalaryRange}
            key={item.salaryRangeId}
            salaryDetails={item}
          />
        ))}
      </div>
    )
  }

  renderSuccess = () => {
    console.log('success')
    const {jobsList} = this.state

    console.log(jobsList)
    return (
      <ul className="jobsListContainer">
        {jobsList.map(job => (
          <JobCard key={job.id} jobCardDetails={job} />
        ))}
      </ul>
    )
  }

  retryJobsList = () => {
    this.getJobsListDetails()
  }

  renderFailure = () => (
    <div className="jobDetailsFilureContainer">
      <div className="jobsListFailureCard">
        <img
          className="failureJobsListImg"
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
      </div>
      <button onClick={this.retryJobsList} className="failureBtn" type="button">
        Retry
      </button>
    </div>
  )

  renderLoadingJobsList = () => (
    <div className="loaderJobsLIstContainer" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const {apiStatus} = this.state
    console.log('bheemacha')
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusList.success:
        return this.renderSuccess()
      case apiStatusList.failure:
        return this.renderFailure()
      case apiStatusList.inprogress:
        return this.renderLoadingJobsList()
      case apiStatusList.empty:
        return this.renderEmpty()
      default:
        return null
    }
  }

  inputTextChange = event => {
    this.setState({searchText: event.target.value})
  }

  updateJobsListOnSearch = () => {
    this.getJobsListDetails()
  }

  render() {
    const {filterEmploymentType, searchText} = this.state
    console.log('bheemchand')
    console.log(filterEmploymentType)
    return (
      <div className="jobsContainer">
        <Navbar />
        <div className="JobslowerContainer">
          <div className="searchContainer mobile">
            <input
              className="inputElement"
              onChange={this.inputTextChange}
              type="search"
              value={searchText}
            />
            <button
              className="searchBtn"
              aria-label="Mute volume"
              type="button"
              data-testid="searchButton"
              onClick={this.updateJobsListOnSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="jobsFilterContainer">
            <Profile />
            <hr />
            <ul className="unorderList">{this.renderEmployment()}</ul>
            <hr />
            <ul className="unorderList">{this.renderSalaryRange()}</ul>
          </div>
          <div className="JobsListContainer">
            <div className="searchContainer desktop">
              <input
                className="inputElement"
                onChange={this.inputTextChange}
                type="search"
                value={searchText}
              />
              <button
                className="searchBtn"
                aria-label="Mute volume"
                type="button"
                data-testid="searchButton"
                onClick={this.updateJobsListOnSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
