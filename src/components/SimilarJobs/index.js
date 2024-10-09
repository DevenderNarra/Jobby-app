import {FaRegStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobs = ({jobDetails}) => {
  const {
    companyLogoUrl,
    employmentType,
    description,
    location,
    rating,
    title,
  } = jobDetails
  return (
    <li className="similar-job-card">
      <ul className="img-content-container">
        <img src={companyLogoUrl} alt="similar job company logo" />
        <ul className="content-container">
          <h1 className="heading">{title}</h1>
          <ul className="rating-container">
            <FaRegStar />
            <p>{rating}</p>
          </ul>
        </ul>
      </ul>
      <h6>Description</h6>
      <span>{description}</span>
      <div className="location-internship-container">
        <div className="location">
          <MdLocationOn />
          <p>{location}</p>
        </div>
        <div className="internship">
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
