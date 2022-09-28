import axios from "axios";

export async function signup(userSubmittedData) {
  try {
    const signUpResponse = await axios.post(
      "http://localhost:3000/quiz/signup",
      {
        username: userSubmittedData.username,
        email: userSubmittedData.email,
        password: userSubmittedData.password,
        confirmPassword: userSubmittedData.confirmPassword,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return signUpResponse.data;
  } catch (err) {
    console.log(err.signUpResponse);
    throw err;
  }
}
