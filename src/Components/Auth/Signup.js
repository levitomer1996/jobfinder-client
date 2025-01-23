import React, { useContext, useEffect, useState } from "react";
import SignupStepOneChooseType from "./SignupComponents/SignupStepOneChooseType";
import SignupStepTwoFillDetails from "./SignupComponents/SignupStepTwoFillDetails";
import jts from "../../API/jts";
import { SignupFlowContext } from "../../Context/SignupFlowContext";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const {
    state,
    setSignupFlowUser,
    setSignupFlowRole,
    setSignupFlowStep,
    SumbitFinalForm,
  } = useContext(SignupFlowContext);

  useEffect(() => {
    if (state.role == "jobseeker" || state.role == "employer") {
      setSignupFlowStep(2);
    }
  }, [state.role]);

  switch (state.step) {
    case 1:
      return <SignupStepOneChooseType setRole={setSignupFlowRole} />;
    case 2:
      return (
        <SignupStepTwoFillDetails
          setUser={setSignupFlowUser}
          SumbitFinalForm={SumbitFinalForm}
          error={state.error}
        />
      );
    case 3:
      return <Navigate to="/" replace />;
  }
};

export default Signup;
