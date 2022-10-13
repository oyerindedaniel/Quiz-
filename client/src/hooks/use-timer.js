import { useState, useCallback } from "react";

const useTimer = (countDownTime) => {
  const [timer, setTimer] = useState(null);

  const timerFunction = useCallback(() => {
    const distance = countDownTime() - new Date().getTime();

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimer([hours, minutes, seconds]);
  }, [countDownTime]);

  //
  //     if (distance < 0) {
  //       clearInterval(x);
  // document.getElementById("demo").innerHTML = "EXPIRED";
  //     }

  //   const x = setInterval(, 1000);

  return {
    timerFunction,
    timer,
  };
};

export default useTimer;
