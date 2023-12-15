import { useSharedStates } from "@/contexts";
import { BtnContainer, QuestionBoxHeading, QuestionBoxPara } from "../index";

export function Intro() {
  const { handleOkClick } = useSharedStates();

  return (
    <>
      <h1 style={{ fontSize: "6rem", fontWeight: 800 }}>
        Mind Learning Ethiopia
      </h1>
      <QuestionBoxPara>
        Learn. Grow. Elevate.
        {/* <br />
        <br />
        You will spend
        <br />- 6 hours/week for the first 5 weeks
        <br />- 15 hours/week for the last 3 weeks */}
      </QuestionBoxPara>
      <BtnContainer showPressEnter={true} onClick={handleOkClick}>
        I agree
      </BtnContainer>
    </>
  );
}
