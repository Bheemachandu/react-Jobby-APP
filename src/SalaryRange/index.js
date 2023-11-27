import './index.css'

const SalaryRange = props => {
  const {salaryDetails, updateSalaryRange} = props
  const {label, salaryRangeId} = salaryDetails
  console.log('SalaryRange')
  const updatesalary = () => {
    updateSalaryRange(salaryRangeId)
  }
  return (
    <li className="listOfItems">
      <div className="salaryRangeInputContainer">
        <input
          onChange={updatesalary}
          id={salaryRangeId}
          className="salaryRangeInput"
          type="radio"
        />
        <label htmlFor={salaryRangeId}>{label}</label>
      </div>
    </li>
  )
}

export default SalaryRange
