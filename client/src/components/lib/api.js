import axios from "axios";

export async function signup(userSubmittedData) {
  try {
    const signUpUser = await axios.post("http://localhost:3000/quiz/signup", {
      username: userSubmittedData.username,
      email: userSubmittedData.email,
      password: userSubmittedData.password,
      confirmPassword: userSubmittedData.confirmPassword,
    });
    return signUpUser.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
