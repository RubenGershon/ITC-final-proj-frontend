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

async function fetchPet(petId) {
  return {
    id: "1",
    userId: "11",
    name: "Pita",
    type: "dog",
    color: "brown",
    height: "0.50",
    weight: "5",
    bio: "Some very interesting things to say",
    status: "adopted",
    imgUrl: "https://images.dog.ceo/breeds/malamute/n02110063_3853.jpg",
  };
}

async function fetchPets(activeUser) {
  return [
    {
      id: "1",
      userId: "11",
      name: "Pita",
      type: "dog",
      color: "brown",
      height: "0.50",
      weight: "5",
      bio: "Some very interesting things to say",
      status: "adopted",
      imgUrl: "https://images.dog.ceo/breeds/malamute/n02110063_3853.jpg",
    },
    {
      id: "2",
      userId: "12",
      name: "Rex",
      type: "dog",
      color: "brown",
      height: "0.50",
      weight: "5",
      bio: "Some very interesting things to say",
      status: "fostered",
      imgUrl: "https://images.dog.ceo/breeds/malamute/n02110063_3853.jpg",
    },
  ];
}

async function fetchSavedPets(activeUser) {
  return [
    {
      id: "3",
      userId: "",
      name: "Fifi",
      type: "dog",
      color: "brown",
      height: "0.50",
      weight: "5",
      bio: "Some very interesting things to say",
      status: "free",
      imgUrl: "https://images.dog.ceo/breeds/malamute/n02110063_3853.jpg",
    },
  ];
}

export { signup, login, fetchPet, fetchPets, fetchSavedPets };
