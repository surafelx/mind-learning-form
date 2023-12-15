import { useSharedStates } from "@/contexts";
import { useHandleKeypress, useHandleScroll } from "@/hooks";
import { useEffect } from "react";
import { Question } from "../index";
import { useQuestions } from "@/contexts";
import axios from "axios";

export function MainContent() {
  const { questionNum, setShowIndustriesList } = useSharedStates();
  const { prev, now } = questionNum;
  const { state } = useQuestions();

  useHandleKeypress();
  useHandleScroll();

  useEffect(() => {
    function handleClick() {
      setShowIndustriesList(false);
    }

    document.addEventListener("click", handleClick);

    return function () {
      document.removeEventListener("click", handleClick);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (prev == 3 && now == 4 && state.firstName) {
    axios
      .post(
        "https://sheet.best/api/sheets/234b6618-e473-43ea-8e41-884d41850300",
        state
      )
      .then((response) => {
        state.firstName = "";
        console.log(response);
      });
    state.firstName = "";
  }
  return (
    <section>
      <div>
        <Question
          type="intro"
          outView={now - 1 === 0 || now > 1}
          outViewSlide="up"
          inView={now === 0}
          inViewSlide={prev === 1 ? "down" : ""}
          isRendered={prev === null}
        />

        {[0, 2].includes(prev ?? -1) && [now - 1, now, now + 1].includes(1) && (
          <Question
            type="firstName"
            outView={[now - 1, now + 1].includes(1)}
            outViewSlide={now - 1 === 1 ? "up" : "down"}
            inView={now === 1}
            inViewSlide={prev === 2 ? "down" : "up"}
          />
        )}

        {[1, 3].includes(prev ?? 0) && [now - 1, now, now + 1].includes(2) && (
          <Question
            type="role"
            outView={[now - 1, now + 1].includes(2)}
            outViewSlide={now - 1 === 2 ? "up" : "down"}
            inView={now === 2}
            inViewSlide={prev === 3 ? "down" : "up"}
          />
        )}

        {[2, 4].includes(prev ?? 0) && [now - 1, now, now + 1].includes(3) && (
          <Question
            type="email"
            outView={[now - 1, now + 1].includes(3)}
            outViewSlide={now - 1 === 3 ? "up" : "down"}
            inView={now === 3}
            inViewSlide={prev === 4 ? "down" : "up"}
          />
        )}
        {prev === 3 && (
          <div>
            <h1 style={{ fontSize: "4rem", textAlign: "center" }}>Thank You</h1>
            <p style={{ textAlign: "center" }}>We will reach out soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}
