import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'

const profileStatus = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Profile extends Component {
  state = {ApiProfileStatus: profileStatus.initial, profileDetails: ''}

  componentDidMount() {
    this.getProfileDetails()
  }

  formateData = item => ({
    name: item.name,
    profileImageUrl: item.profile_image_url,
    shortBio: item.short_bio,
  })

  getProfileDetails = async () => {
    this.setState({ApiProfileStatus: profileStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const profileUrl = 'https://apis.ccbp.in/profile'
    const profileOptions = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, profileOptions)

    const data = await response.json()
    if (response.ok) {
      const updatedData = this.formateData(data.profile_details)
      this.setState({
        profileDetails: updatedData,
        ApiProfileStatus: profileStatus.success,
      })
    } else {
      this.setState({ApiProfileStatus: profileStatus.failure})
    }
  }

  RetryFailureProfile = () => {
    this.getProfileDetails()
  }

  renderFailureProfile = () => (
    <div className="failureProfileCintainer">
      <button
        onClick={this.RetryFailureProfile}
        type="button"
        className="ProfileFailureBtn"
      >
        Retry
      </button>
    </div>
  )

  renderSuccessProfile = () => {
    const {profileDetails} = this.state

    return (
      <div className="profileContainer">
        <img
          className="profileImg"
          alt="profile"
          src={profileDetails.profileImageUrl}
        />
        <h1 className="profileHeading">{profileDetails.name}</h1>
        <p className="profilePara">{profileDetails.shortBio}</p>
      </div>
    )
  }

  renderLoadingProfile = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    console.log('bheem')
    const {ApiProfileStatus} = this.state
    switch (ApiProfileStatus) {
      case profileStatus.success:
        return this.renderSuccessProfile()
      case profileStatus.failure:
        return this.renderFailureProfile()
      case profileStatus.loading:
        return this.renderLoadingProfile()

      default:
        return null
    }
  }

  render() {
    console.log('naag')
    return <div>{this.renderProfile()}</div>
  }
}

export default Profile
