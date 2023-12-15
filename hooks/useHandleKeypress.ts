import { useQuestions, useSharedStates } from "@/contexts";
import { isNotValidPhone } from "@/utils";
import { useEffect } from "react";

export function useHandleKeypress() {
  const { questionNum, setErrorMsg, handleQuestionNumUpdate } =
    useSharedStates();

  const { now } = questionNum;
  const { state } = useQuestions();
  const { firstName, lastName, industry, role, goals, email } = state;

  useEffect(() => {
    function handleKeypress(event: KeyboardEvent) {
      if (event.key === "Enter") {
        event.preventDefault();

        if (now + 1 === 2 && firstName === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            firstName: "Please fill this in",
          }));
          return;
        } else if (now + 1 === 3 && role === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            role: "Oops! Please make a selection",
          }));
          return;
        } else if (now + 1 === 4 && email && isNotValidPhone(email)) {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            email: "Hmm... that email doesn't look right",
          }));
          return;
        }
        console.log(now);
        handleQuestionNumUpdate();
      }
    }

    document.addEventListener("keypress", handleKeypress);

    return function () {
      document.removeEventListener("keypress", handleKeypress);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, industry, lastName, now, role, goals, email]);
}
