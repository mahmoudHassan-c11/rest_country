const themeBtn = document.querySelector(".theme-button");
const themeText = document.querySelector(".theme-button p");
const searchIcon = document.querySelector(".search-input i");
const searchInput = document.querySelector(".search");
const selectItem = document.querySelector("select");
const countries = document.querySelector(".countries");

const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  if (currentTheme === "dark") {
    document.body.classList.add("theme");
    themeText.textContent = "Light Mode";
  } else {
    document.body.classList.remove("theme");
    themeText.textContent = "Dark Mode";
  }
} else {
  console.log("no");
}
themeBtn.addEventListener("click", () => {
  if (themeText.textContent === "Dark Mode") {
    document.body.classList.add("theme");
    localStorage.setItem("theme", "dark");
    themeText.textContent = "Light Mode";
  } else {
    document.body.classList.remove("theme");
    themeText.textContent = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
});
let countiesData = [];
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    countiesData = data;
  });
// Filter Countries with Name
searchIcon.addEventListener("click", (e) => {
  console.log(searchInput.value);
  const countrySearch = countiesData.filter((item) => {
    return item.name.toLowerCase().includes(searchInput.value.trim());
  });
  const counties = countrySearch.map((item) => {
    return `
        <div class="country">
            <img src='${item.flags.png}' alt="" />
            <div class="info"> 
                <h3>${item.name}</h3>
                <p>Population: <span>${item.population}</span></p>
                <p>Region: <span>${item.region}</span></p>
                <p>Capital: <span>${item.capital}</span></p>
              </div>
        </div>
            `;
  });
  countries.innerHTML = counties.join("");
  console.log(countrySearch);
});
searchInput.addEventListener("input", (e) => {
  const countrySearch = countiesData.filter((item) => {
    return item.name.toLowerCase().includes(searchInput.value.trim());
  });
  const counties = countrySearch.map((item) => {
    return `
        <div class="country">
            <img src='${item.flags.png}' alt="" />
            <div class="info"> 
                <h3>${item.name}</h3>
                <p>Population: <span>${item.population}</span></p>
                <p>Region: <span>${item.region}</span></p>
                <p>Capital: <span>${item.capital}</span></p>
              </div>
        </div>
            `;
  });
  countries.innerHTML = counties.join("");
});
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const countrySearch = countiesData.filter((item) => {
      return item.name.toLowerCase().includes(searchInput.value.trim());
    });
    const counties = countrySearch.map((item) => {
      return `
          <div class="country">
              <img src='${item.flags.png}' alt="" />
              <div class="info"> 
                  <h3>${item.name}</h3>
                  <p>Population: <span>${item.population}</span></p>
                  <p>Region: <span>${item.region}</span></p>
                  <p>Capital: <span>${item.capital}</span></p>
                </div>
          </div>
              `;
    });
    countries.innerHTML = counties.join("");
  }
});

//  Filter Countries with Region
selectItem.addEventListener("change", () => {
  const optionRegion = selectItem.value;
  const counties = countiesData
    .filter((item) => {
      return item.region === optionRegion;
    })
    .map((item) => {
      return `
            <div class="country">
                <img src='${item.flags.png}' alt="" />
                <div class="info"> 
                    <h3>${item.name}</h3>
                    <p>Population: <span>${item.population}</span></p>
                    <p>Region: <span>${item.region}</span></p>
                    <p>Capital: <span>${item.capital}</span></p>
                  </div>
            </div>
                `;
    });
  countries.innerHTML = counties.join("");
});

function fetchData() {
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      const counties = data.map((item) => {
        return `
            <div class="country" 
            }}">
                <img src='${item.flags.png}' alt="" />
                <div class="info"> 
                    <h3>${item.name}</h3>
                    <p>Population: <span>${item.population}</span></p>
                    <p>Region: <span>${item.region}</span></p>
                    <p>Capital: <span>${item.capital}</span></p>
                  </div>
            </div>
                `;
      });
      countries.innerHTML = counties.join("");
    });
}

fetchData();

countries.addEventListener("click", (e) => {
  const countryBox = e.target.closest(".country");
  console.log(countryBox);

  const countryName = countryBox.querySelector("h3").textContent;
  // احفظ الاسم أو البيانات كلها في localStorage
  localStorage.setItem("counteryName", countryName);

  // روح للصفحة الجديدة
  window.location.href = "details.html";
});
