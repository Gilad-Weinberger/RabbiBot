document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatMessages = document.getElementById("chat-messages");

  // Auto-resize textarea
  userInput.addEventListener("input", () => {
    userInput.style.height = "auto";
    userInput.style.height = userInput.scrollHeight + "px";
  });

  // Handle form submission
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();

    if (!message) return;

    // Add user message
    addMessage(message, "user");
    userInput.value = "";
    userInput.style.height = "auto";

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      addMessage(
        "This is a simulated response from the chatbot. In a real implementation, this would be connected to an AI API.",
        "bot"
      );
    }, 1000);
  });

  // Handle Enter key (submit on Enter, new line on Shift+Enter)
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      chatForm.dispatchEvent(new Event("submit"));
    }
  });

  function addMessage(content, role) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${role}`;
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
