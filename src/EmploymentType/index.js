import './index.css'

const EmploymentType = props => {
  const {employmentDetails, updateEmploymentType} = props
  const {label, employmentTypeId} = employmentDetails
  console.log('anagani')
  const updateFilter = () => {
    updateEmploymentType(employmentTypeId)
  }
  return (
    <li className="employmentTypeInputContainer">
      <input
        onChange={updateFilter}
        id={employmentTypeId}
        className="employmentTypeInput"
        type="checkbox"
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default EmploymentType
