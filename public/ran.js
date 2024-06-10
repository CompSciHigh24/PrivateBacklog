const createForm = document.querySelector("form");

createForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const mediaData = new FormData(createForm);
  const reqBody = Object.fromEntries(mediaData);

  fetch("/addItem", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  }).then(() => {
    window.location.href = "/";
  });
});
