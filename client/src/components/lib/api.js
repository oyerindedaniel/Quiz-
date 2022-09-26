import axios from "axios";

export async function signup(userSubmittedData) {
  try {
    const signUpUser = await axios.post("http://localhost:3000/quiz/signup", {
      username: userSubmittedData.username,
      email: userSubmittedData.email,
      password: userSubmittedData.password,
      confirmPassword: userSubmittedData.confirmPassword,
    });
    console.log(signUpUser);
  } catch (err) {}
}

// export async function getCountryWithRegion(region) {
//   const response = await fetch(`${GET_ALL_COUNTRIES}/region/${region}`);
//   const countryData = await response.json();

//   if (!response.ok) {
//     throw new Error(countryData.message || "Could not fetch countries.");
//   }

//   return countryData;
// }

// .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
