// The function receives the current state (array of pets)
// and and action:
//  action.type - what operation to preform on the state (add pets, delete pet, etc.)
//  action.data - additional data specific for the action type (e.g. the pet to add)
// The function return the new state (new pets) after it has been changed

export default function petsReducer(pets, action) {
  switch (action.type) {
    case "SET_PETS":
      return action.data;
    case "ADD_PET":
      return [action.data, ...pets];
    case "DELETE_PET":
      return pets.filter((pet) => pet !== action.data);
    default:
      throw new Error();
  }
}
