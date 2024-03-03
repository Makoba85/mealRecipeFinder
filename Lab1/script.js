function validateEmail(email) {
    // Regular expression for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Check if email matches the regex
    const isValid = emailRegex.test(email);
  
    // Display validation message based on the result
    const messageElement = document.getElementById("validationMessage");
    if (isValid) {
      messageElement.textContent = "Email is valid!";
      messageElement.style.color = "green";
    } else {
      messageElement.textContent = "Email is invalid!";
      messageElement.style.color = "red";
    }
  
    return isValid; // Return true or false for further use
  }
  
  // Get the email input field and button elements
  const emailInput = document.getElementById("email");
  const validateButton = document.querySelector("button");
  
  // Attach event listener to the button click
  validateButton.addEventListener("click", () => {
    const email = emailInput.value;
    validateEmail(email); // Call the function with the entered email
  });
  