import Greet from "../components/Greet"
import TermsAndConditions from "../components/TermsAndConditions"

const TestingComponentsTab = () => {
  return (
    <>
        <div className="container">
          <Greet />
          <Greet name="Mica" />
        </div>
        <div className="container my-4">
          <TermsAndConditions />
        </div>
    </>
  )
}

export default TestingComponentsTab