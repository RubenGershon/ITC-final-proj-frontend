import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

async function login(email, password) {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

async function signup(signUpDataObj) {
  try {
    const response = await api.post("/auth/signup", signUpDataObj);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

async function getUserData() {
  console.log("get user data")
  try {
    const response = await api.get("/user");
    return response.data.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

async function getPetsByIds(listOfPetsIds) {
  console.log("get pets by id");
  try {
    const response = await api.get("/pet/byIDs", {
      params: { listOfPetsIds: JSON.stringify(listOfPetsIds) },
    });
    return response.data.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

export default { signup, login, getUserData, getPetsByIds };
