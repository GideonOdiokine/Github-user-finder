const nav = document.querySelector("#main");
const topOfNav = nav.offsetTop;
const hamburger = document.getElementById("burger");
const navIcons = document.querySelector("#nav-bottom");
const input = document.querySelector(".input");

input.addEventListener("click", () => {
  input.classList.toggle("active")
    ? (document.getElementById("btnn").style.display = "none")
    : (document.getElementById("btnn").style.display = "block");
});
// function fixNav() {
//   if (window.scrollY >= topOfNav) {
//     nav.classList.add("fixedNav");
//   } else {
//     nav.classList.remove("fixedNav");
//   }
// }
// window.addEventListener("scroll", fixNav);
hamburger.addEventListener("click", () => {
  navIcons.classList.toggle("active");
  //   navLink.classList.toggle("active");
});

const form = document.getElementById("form");
const formWrapper = document.querySelector(".login-div");
const profileBody = document.getElementById("bg");
const avatarImg = document.getElementById("avatarImg");
const userlogin = document.getElementById("login");
const userName = document.getElementById("name");
const bioText = document.getElementById("bio");
const repoCount = document.getElementById("count");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchText = document.getElementById("searchText").value;
  const orignal = searchText.split(" ").join("");

  fetch("https://api.github.com/users/" + orignal)
    .then((res) => res.json())
    .then((data) => {
      profileBody.style.display = "block";
      formWrapper.style.display = "none";
      const result = data;
      displayUser(result);
      console.log(result);
      repos();
    })
    .catch((err) => console.log(err));
});

function displayUser(user) {
  const { avatar_url, login, bio, name, public_repos } = user;
  avatarImg.src = avatar_url;
  userName.innerText = name;
  userlogin.textContent = login;
  bioText.textContent = bio;
  repoCount.textContent = public_repos;
}

function repos() {
  const searchText = document.getElementById("searchText").value;
  const orignal = searchText.split(" ").join("");

  fetch("https://api.github.com/users/" + orignal + "/repos")
    .then((res) => res.json())
    .then((data) => {
      const result = data;
      displayRepos(result);
    })
    .catch((err) => console.log(err));
}

function displayRepos(repos) {
  let output = "";

  repos.forEach((repo) => {

    output += `
    <div class="repo-detail">
                <a href="#">${repo.name}</a>
                
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <button>
                    <svg
                      aria-label="star"
                      role="img"
                      viewBox="0 0 16 16"
                      version="1.1"
                      data-view-component="true"
                      height="13"
                      width="13"
                      class="octicon octicon-star"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                      ></path>
                    </svg>
                    star
                  </button>
                </div>
              </div>
              <div class="repo-detail-info">
              <p>${repo.description || ""}</p>
                <div class="d-flex">
                  <i class="html-color"> </i>
                  ${repo.language || ""}
                </div>
              </div>
            </div>

            <div class="underline"></div>
    `;
  });
  document.getElementById("output").innerHTML = output;
}

