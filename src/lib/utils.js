function createTweetObj(userId, newInput) {
  return {
    userId: userId,
    content: newInput,
    date: new Date().toISOString(),
  };
}

function displaySignUpError(signUpErr) {
  if (signUpErr.includes("email-already-in-use")) return "Email already in-use";
  if (signUpErr.includes("invalid-email")) return "Invalid email";
  if (signUpErr.includes("weak"))
    return "Weak Password - should be at least 6 characters.";
  else return "Unkonwn error";
}

function displayLoginError(err) {
  if (err.includes("invalid-email")) return "Invalid Email";
  if (err.includes("wrong-password")) return "Wrong Password";
  else return "User not found";
}

export { createTweetObj, displaySignUpError, displayLoginError };
