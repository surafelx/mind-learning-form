import { useQuestions, useSharedStates } from "@/contexts";
import classNames from "classnames";
import {
  BtnContainer,
  Error,
  QuestionBoxPara,
  QuestionInputText,
  QuestionNumHeading,
} from "../index";
import Image from "next/image";
import styles from "./Question.module.css";
import { ChangeEventHandler } from "react";
import { SET_EMAIL } from "@/reducers";

export function EmailInput() {
  const { errorMsg: error, setErrorMsg, handleOkClick } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.email ?? "";
  const { email } = state;

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    errorMsg &&
      setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.email;
        return prevValue;
      });

    dispatch({ type: SET_EMAIL, payload: event.target.value });
  };

  return (
    <>
      <QuestionNumHeading questionNum={3}>
        Phone Number you&apos;d like to register with? *
      </QuestionNumHeading>

      <QuestionBoxPara>
        We will keep all our communications with you through this phone. Do
        check your messages if you didn&apos;t receive a call.
      </QuestionBoxPara>

      <QuestionInputText
        type="tel"
        placeholder="0911234567"
        value={email}
        onChange={handleInputChange}
      />

      {errorMsg && <Error message={errorMsg} />}

      {errorMsg === "" && (
        <BtnContainer
          className={classNames(styles["btn-container"], styles["ok"])}
          showPressEnter={true}
          onClick={handleOkClick}
        >
          OK{" "}
          <Image
            src="/check-small.svg"
            alt="check small"
            width={34}
            height={34}
          />
        </BtnContainer>
      )}
    </>
  );
}
