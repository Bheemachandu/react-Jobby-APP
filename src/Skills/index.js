import './index.css'

const Skills = props => {
  const {skillsDetails} = props
  return (
    <li className="skillsContainer">
      <img
        className="skillsImg"
        alt={skillsDetails.name}
        src={skillsDetails.image_url}
      />
      <p>{skillsDetails.name}</p>
    </li>
  )
}

export default Skills
