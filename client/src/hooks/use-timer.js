// import { useState } from "react";

// const useTimer = (getQuizDuration) => {
//   const [timer, setTimer] = useState(null);

//   const countDownDate = getQuizDuration();

//   const x = setInterval(function () {
//     const now = new Date().getTime();

//     const distance = countDownDate - now;

//     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     const hours = Math.floor(
//       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//     );
//     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     setTimer([hours, minutes, seconds]);

//   document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//   + minutes + "m " + seconds + "s ";

// If the count down is over, write some text
//     if (distance < 0) {
//       clearInterval(x);
// document.getElementById("demo").innerHTML = "EXPIRED";
//     }
//   }, 1000);

//   return timer;
// };

// export default useTimer;
