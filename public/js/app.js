//Client side scripts

const form = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
// const image = document.querySelector(".weather-icon");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = input.value;

  messageOne.textContent = "Loading...";

  fetch(`/weather/location?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        // image.style.display = "block";
        messageOne.textContent = data.location;
        messageTwo.textContent = data.temperature + " degrees fareinheit";
        messageThree.textContent = data.weather;
      }
    });
  });
  input.value = "";
});
