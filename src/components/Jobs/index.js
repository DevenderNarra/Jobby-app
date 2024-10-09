import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import AllJobsSection from '../AllJobsSection'
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

class Jobs extends Component {
  state = {
    selectedEmploymentTypes: [],
    selectedSalaryRange: '',
    profileApiStatus: 'initial',
  }

  componentDidMount() {
    this.fetchProfileData()
  }

  // Handle checkbox selection
  handleEmploymentTypeChange = event => {
    const {value} = event.target
    this.setState(prevState => {
      const {selectedEmploymentTypes} = prevState
      if (selectedEmploymentTypes.includes(value)) {
        // Remove if already selected (uncheck)
        return {
          selectedEmploymentTypes: selectedEmploymentTypes.filter(
            item => item !== value,
          ),
        }
      }
      // Add if not selected
      return {
        selectedEmploymentTypes: [...selectedEmploymentTypes, value],
      }
    })
  }

  // Handle radio button selection for salary range
  handleSalaryRangeChange = event => {
    this.setState({
      selectedSalaryRange: event.target.value,
    })
  }

  fetchProfileData = async () => {
    this.setState({profileApiStatus: 'initial'})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const profileData = {
          profileImageUrl: data.profile_details.profile_image_url,
          name: data.profile_details.name,
          shortBio: data.profile_details.short_bio,
        }
        this.setState({profileData, profileApiStatus: 'success'})
      } else {
        this.setState({profileApiStatus: 'failure'})
      }
    } catch (error) {
      // Handle fetch errors
      this.setState({
        profileApiStatus: 'failure',
      })
    }
  }

  renderProfileSection = () => {
    const {profileData} = this.state
    console.log(profileData)
    return (
      <ul className="profile-section">
        <img src={profileData.profileImageUrl} alt="profile" />
        <h2>{profileData.name}</h2>
        <p>{profileData.shortBio}</p>
      </ul>
    )
  }

  handleRetryProfile = () => {
    this.fetchProfileData()
  }

  render() {
    const {
      selectedEmploymentTypes,
      selectedSalaryRange,
      profileApiStatus,
    } = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-filter-sections">
            <ul className="profile-section">
              {profileApiStatus === 'success' && this.renderProfileSection()}
              {profileApiStatus === 'failure' && (
                <div>
                  <button type="button" onClick={this.handleRetryProfile}>
                    Retry
                  </button>
                </div>
              )}
            </ul>
            <hr />
            <ul className="types-of-empolyments">
              <h3>Type of Employment</h3>
              {employmentTypesList.map(eachItem => (
                <li key={eachItem.employmentTypeId}>
                  <input
                    type="checkbox"
                    value={eachItem.employmentTypeId}
                    onChange={this.handleEmploymentTypeChange} // Handle checkbox change
                  />
                  <label>{eachItem.label}</label>
                </li>
              ))}
            </ul>
            <hr />
            <ul className="salary-ranges">
              <h3>Salary Range</h3>
              {salaryRangesList.map(eachItem => (
                <li key={eachItem.salaryRangeId}>
                  <input
                    type="radio"
                    name="salary" // Ensure all radios are grouped
                    value={eachItem.salaryRangeId}
                    onChange={this.handleSalaryRangeChange} // Handle radio button change
                  />
                  <label>{eachItem.label}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="search-jobs-container">
            {/* Pass selected filters to AllJobsSection */}
            <AllJobsSection
              selectedEmploymentTypes={selectedEmploymentTypes}
              selectedSalaryRange={selectedSalaryRange}
            />
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
