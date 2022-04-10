import axios from "axios";

async function login(username, password) {
  //const response = await api.post("/auth/login", { username, password });
  return { userId: "11" };
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

export { login, fetchPet, fetchPets, fetchSavedPets };
