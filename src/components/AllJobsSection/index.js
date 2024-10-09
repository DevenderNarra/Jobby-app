import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import JobCard from '../JobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  componentDidUpdate(prevProps) {
    const {selectedEmploymentTypes, selectedSalaryRange} = this.props
    const {
      selectedEmploymentTypes: prevEmploymentTypes,
      selectedSalaryRange: prevSalaryRange,
    } = prevProps
    if (
      prevEmploymentTypes !== selectedEmploymentTypes ||
      prevSalaryRange !== selectedSalaryRange
    ) {
      this.getProducts()
    }
  }

  getProducts = async () => {
    const {searchInput} = this.state
    const {selectedEmploymentTypes, selectedSalaryRange} = this.props

    const employmentTypeQuery = selectedEmploymentTypes.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
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
        const fetchedData = await response.json()
        const updatedData = fetchedData.jobs.map(product => ({
          companyLogoUrl: product.company_logo_url,
          employmentType: product.employment_type,
          id: product.id,
          jobDescription: product.job_description,
          location: product.location,
          packagePerAnnum: product.package_per_annum,
          rating: product.rating,
          title: product.title,
        }))
        this.setState({
          productsList: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    } catch (error) {
      // Handle fetch errors
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  handleSearch = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickBtn = () => {
    // Trigger the state update and API call after searchInput is updated
    this.setState(
      prevState => ({
        searchInput: prevState.searchInput, // or keep the current search value
      }),
      this.getProducts, // Only make the API call after state is updated
    )
  }

  renderNotFoundView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div className="all-jobs-container">
        <div className="search-container">
          <input
            type="search"
            placeholder="Search"
            onChange={this.handleSearch}
          />
          <button
            type="button"
            data-testid="searchButton"
            onClick={this.onClickBtn}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {productsList.length === 0 ? (
          this.renderNotFoundView()
        ) : (
          <ul className="products-list">
            {productsList.map(product => (
              <JobCard jobDetails={product} key={product.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsListFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <Link to="/jobs">
        <button type="button">Retry</button>
      </Link>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsList()
      case apiStatusConstants.failure:
        return this.renderJobsListFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }
}

export default AllJobsSection
