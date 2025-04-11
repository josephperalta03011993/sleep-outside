// Main entry point for the application
import { loadHeaderFooter } from "./utils.mjs";
import Modal from "./modal.mjs";

// Display promotional modal
const title = "Get a change to win premium camping gear!";
const message =
  "Sign up for our newsletter and be entered into a draw to win premium camping gear. Don't miss out on this opportunity to enhance your outdoor experience!";
const modal = new Modal(title, message, true);
modal.ShowModal();

// Load header/footer (Wk 3)
loadHeaderFooter();

// Newsletter subscription logic
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletter-form");
  const subscribeMessage = document.getElementById("subscribe-message");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = form.email;

      if (emailInput.checkValidity()) {

        // Save to localStorage
        const email = emailInput.value;
        localStorage.setItem("subscribedEmail", email);

        subscribeMessage.textContent = `Thank you ${emailInput.value}!`;
        subscribeMessage.classList.remove("hidden");
        form.reset();
      } else {
        subscribeMessage.textContent = "Please enter a valid email address.";
        subscribeMessage.classList.remove("hidden");
      }
    });
  } else {
    console.warn("Newsletter form not found in the document.");
  }
});
