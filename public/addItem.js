const buttons = document.querySelectorAll(".delete");

for (let i = 0; i < buttons.length; i++) {
  let deleteButton = buttons[i].value;
  buttons[i].addEventListener("click", () => {
    fetch("/BacklogItem/" + deleteButton, {
      method: "DELETE",
    }).then((DBr) => {
      window.location.href = "/";
    });
  });
}

const buttons2 = document.querySelectorAll(".update");

for (let i = 0; i < buttons2.length; i++) {
  let updateButton = buttons2[i].name;
  buttons2[i].addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(true)
    const mediaData = new FormData(buttons2[i]);
    const reqBody = Object.fromEntries(mediaData);
    
    fetch("/BacklogItem/" + updateButton, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    }).then((DBr) => {
      window.location.href = "/" ;
    });
  });
}
