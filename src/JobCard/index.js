import {Link} from 'react-router-dom'
import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobCardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobCardDetails
  return (
    <li className="listOfItems">
      <Link className="jobLink" to={`/jobs/${id}`}>
        <div className="jobCardContainer">
          <div className="titleContainer">
            <img className="jobLogo" alt="company logo" src={companyLogoUrl} />
            <div className="titelRatingContainer">
              <h1 className="jobTitle">{title}</h1>
              <div className="ratingContainer">
                <IoIosStar className="starIcon" />
                <p className="ratingText">{rating}</p>
              </div>
            </div>
          </div>
          <div className="locationContainer">
            <div className="locationInnerContainer">
              <MdLocationOn />
              <p className="locationText">{location}</p>
              <MdLocationOn />
              <p>{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <h1 className="descriptionHeading">Description</h1>
          <p className="descriptionpara">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
