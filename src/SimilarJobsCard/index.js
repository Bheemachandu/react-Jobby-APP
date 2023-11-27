import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobsCard = props => {
  const {similarJobDetails} = props
  return (
    <li className="similarJobsCardContainer">
      <div className="similarJobsTitleContainer">
        <img
          className="similarjobLogo"
          alt="similar job company logo"
          src={similarJobDetails.company_logo_url}
        />
        <div>
          <h1 className="jobTitle">{similarJobDetails.title}</h1>
          <div className="similarJobsCardRatingContainer">
            <IoIosStar className="starIcon" />
            <p className="ratingText">{similarJobDetails.rating}</p>
          </div>
        </div>
      </div>
      <h1>Description</h1>
      <p>{similarJobDetails.job_description}</p>
      <div className="similarJobsLocationContainer">
        <MdLocationOn />
        <p className="locationText">{similarJobDetails.location}</p>
        <MdLocationOn />
        <p>{similarJobDetails.employment_type}</p>
      </div>
    </li>
  )
}

export default SimilarJobsCard
