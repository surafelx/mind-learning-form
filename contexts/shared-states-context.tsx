/* eslint-disable @typescript-eslint/no-empty-function */
import { TOTAL_QUESTIONS } from "@/constants";
import { ObjectType, QuestionNumType, SharedStatesContextType } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";
import { useQuestions } from "@/contexts";

const SharedStatesContext = createContext<SharedStatesContextType>({
  questionNum: { prev: null, now: 0 },
  setQuestionNum: () => {},
  errorMsg: {},
  setErrorMsg: () => {},
  showIndustriesList: false,
  setShowIndustriesList: () => {},
  handleQuestionNumUpdate: () => {},
  handleOkClick: () => {},
});

type SharedStatesProviderType = {
  readonly children: ReactNode;
};

export function SharedStatesProvider({ children }: SharedStatesProviderType) {
  const { state } = useQuestions();
  const [questionNum, setQuestionNum] = useState<QuestionNumType>({
    prev: null,
    now: 0,
  });

  const [errorMsg, setErrorMsg] = useState<ObjectType>({});
  const [showIndustriesList, setShowIndustriesList] = useState(false);

  function handleQuestionNumUpdate() {
    setQuestionNum((prevValue) =>
      prevValue.now + 1 >= TOTAL_QUESTIONS + 1
        ? { ...prevValue }
        : { prev: prevValue.now, now: prevValue.now + 1 }
    );
    const { prev, now } = questionNum;
    if (prev == 3 && now == 4) {
      console.log(state);
      fetch(
        "https://script.google.com/macros/s/AKfycbw7oGbEAcLJx7OmUf27Ur2rQ6CuygKTUBIufskgZUBBb06uetaBM1sa7qUszQABhIaimQ/exec",
        {
          method: "POST",
          body: JSON.stringify(state),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleOkClick() {
    document.dispatchEvent(
      new KeyboardEvent("keypress", {
        key: "Enter",
      })
    );
  }

  // AKfycbw7oGbEAcLJx7OmUf27Ur2rQ6CuygKTUBIufskgZUBBb06uetaBM1sa7qUszQABhIaimQ
  // https://script.google.com/macros/s/AKfycbw7oGbEAcLJx7OmUf27Ur2rQ6CuygKTUBIufskgZUBBb06uetaBM1sa7qUszQABhIaimQ/exec
  const value = {
    questionNum,
    setQuestionNum,
    errorMsg,
    setErrorMsg,
    showIndustriesList,
    setShowIndustriesList,
    handleQuestionNumUpdate,
    handleOkClick,
  };

  return (
    <SharedStatesContext.Provider value={value}>
      {children}
    </SharedStatesContext.Provider>
  );
}

export function useSharedStates(): SharedStatesContextType {
  const context = useContext(SharedStatesContext);

  if (context) {
    return context;
  }

  throw new Error("useSharedStates must be use inside SharedStatesProvider");
}
