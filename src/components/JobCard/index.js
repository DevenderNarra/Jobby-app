import {Link} from 'react-router-dom'
import {FaRegStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = ({jobDetails}) => {
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`jobs/${id}`} className="card-item">
      <li className="card">
        <div className="company-logo-container">
          <img src={companyLogoUrl} alt="company logo" />
          <div className="company-content-container">
            <h2>{title}</h2>
            <div className="rating-container">
              <FaRegStar />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-internship-container">
          <div className="location">
            <MdLocationOn />
            <p>{location}</p>
          </div>
          <div className="internship">
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h2>Description</h2>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobCard
