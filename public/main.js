/*CR: I think that if you query these objects before you wait for DOMContentLoaded 
  you may find yourself with null variables, since you query them before waiting for DOMLoad.
  */
const updateButton = document.querySelector("button#update-button");
const deleteButton = document.getElementById("delete-button");
const message = document.querySelector("#message");

//CR: I've never used this event listener, I think there's a better way to wait for a full load. Google it.
document.addEventListener("DOMContentLoaded", function () {
  init();
  deleteButton.addEventListener(
    "click",
    (e) => {
      //CR: Should sperate the functionality to a differant file
      fetch("/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "orine",
          decription: "bason",
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
          messageDiv.textContent = "ok";
        })
        .then((data) => {
          window.location.reload(true);
        });
    },
    false
  );
});

updateButton.addEventListener("click", function () {
  //CR: Should sperate the functionality to a differant file
  fetch("/tasks", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "orine",
      description: "bason",
    }),
  });
});
