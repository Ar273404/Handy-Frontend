const checkToken = () => {
  const token = localStorage.getItem("token");

  if (token) {
    console.log("Token found:", token);
    return true;
  } else {
    console.log("No token found. Redirecting to login.");
    return false;
  }
};

// Call this function when the page loads
checkToken();
