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

async function logout() {
  try {
    const response = await api.post("/auth/logout");
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
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

async function getUserById(id) {
  try {
    const response = await api.get("/user/" + id);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

async function getAllUsers() {
  try {
    const response = await api.get("/user/all");
    return response.data.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

async function updateUser(updatedDataObj) {
  try {
    const response = await api.put("/user", updatedDataObj);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

async function addPet(petDataObj) {
  // Need to send data as form data because of pet image upload
  try {
    const formData = new FormData();
    formData.append("type", petDataObj.type);
    formData.append("name", petDataObj.name);
    formData.append("adoptionStatus", petDataObj.adoptionStatus);
    formData.append("breed", petDataObj.breed);
    formData.append("color", petDataObj.color);
    formData.append("weight", petDataObj.weight);
    formData.append("height", petDataObj.height);
    formData.append("hypoallergenic", petDataObj.hypoallergenic);
    formData.append("dietaryRestrictions", petDataObj.dietaryRestrictions);
    formData.append("bio", petDataObj.bio);
    formData.append("image", petDataObj.image);

    const response = await api.post("/pet", formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

async function updatePet(petDataObj, id) {
  // Need to send data as form data because of pet image upload
  try {
    const formData = new FormData();
    formData.append("type", petDataObj.type);
    formData.append("name", petDataObj.name);
    formData.append("adoptionStatus", petDataObj.adoptionStatus);
    formData.append("breed", petDataObj.breed);
    formData.append("color", petDataObj.color);
    formData.append("weight", petDataObj.weight);
    formData.append("height", petDataObj.height);
    formData.append("hypoallergenic", petDataObj.hypoallergenic);
    formData.append("dietaryRestrictions", petDataObj.dietaryRestrictions);
    formData.append("bio", petDataObj.bio);

    if (petDataObj.image) formData.append("image", petDataObj.image);
    else {
    }

    const response = await api.post("/pet/" + id, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

async function getPetById(petId) {
  try {
    const response = await api.get(`/pet/${petId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

async function getPetsByIds(listOfPetsIds) {
  try {
    const response = await api.get("/pet/byIDs", {
      params: { listOfPetsIds: JSON.stringify(listOfPetsIds) },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

async function getPetsByQuery(queryObj) {
  const queryStr = JSON.stringify(queryObj);
  try {
    const response = await api.get("/pet", {
      params: { queryStr: queryStr },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

async function savePet(petId) {
  try {
    const response = await api.post(`/pet/${petId}/save`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

async function unsavePet(petId) {
  try {
    const response = await api.delete(`/pet/${petId}/save`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

async function deletePet(petId) {
  try {
    const response = await api.delete(`/pet/${petId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

async function adoptPet(petId, data) {
  try {
    const response = await api.post(`/pet/${petId}/adopt`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

async function returnPet(petId) {
  try {
    const response = await api.post(`/pet/${petId}/return`);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "error", message: error.message };
    }
  }
}

export default {
  signup,
  login,
  logout,
  getUserData,
  getUserById,
  getAllUsers,
  updateUser,
  addPet,
  updatePet,
  getPetById,
  getPetsByIds,
  getPetsByQuery,
  savePet,
  unsavePet,
  deletePet,
  adoptPet,
  returnPet,
};
