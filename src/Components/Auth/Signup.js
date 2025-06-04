import React, { useContext, useEffect } from "react";
import SignupStepOneChooseType from "./SignupComponents/SignupStepOneChooseType";
import SignupStepTwoFillDetails from "./SignupComponents/SignupStepTwoFillDetails";

import { SignupFlowContext } from "../../Context/SignupFlowContext";
import { Navigate } from "react-router-dom";
import EmployerSignup from "./SignupComponents/EmployerSignup";

const Signup = () => {
  const {
    state,
    setSignupFlowUser,
    setSignupFlowRole,
    setSignupFlowStep,
    SumbitFinalForm,
  } = useContext(SignupFlowContext);

  useEffect(() => {
    if (state.role === "jobseeker" || state.role === "employer") {
      setSignupFlowStep(2);
    }
  }, [state.role]);

  switch (state.step) {
    case 1:
      return <SignupStepOneChooseType setRole={setSignupFlowRole} />;
    case 2:
      if (state.role == "jobseeker") {
        return (
          <SignupStepTwoFillDetails
            setUser={setSignupFlowUser}
            SumbitFinalForm={SumbitFinalForm}
            error={state.error}
          />
        );
      }
      if (state.role == "employer") {
        return (
          <EmployerSignup
            setUser={setSignupFlowUser}
            SumbitFinalForm={SumbitFinalForm}
            error={state.error}
          />
        );
      }

    case 3:
      return <Navigate to="/" replace />;
  }
};

export default Signup;
