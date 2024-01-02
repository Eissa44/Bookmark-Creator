let bookmarkInput = document.getElementById("bookmarkInput");
let siteUrlInput = document.getElementById("url");
let searchInput = document.getElementById("searchInput");
let addBtn = document.getElementById("submitBtn");
let updateBtn = document.getElementById("updateBtn");

let sitesList = [];

let indexUpdate = 0;

function addBook() {
  if (validationName() == true && validationURL() == true) {
    let site = {
      siteName: bookmarkInput.value,
      siteUrl: siteUrlInput.value,
    };
    sitesList.push(site);
    localStorage.setItem("site", JSON.stringify(sitesList));
    clearForm();
    viewSites();
  }
}
// end of region

/* linking button(add) and action with click eventlistener */
let submitSite = document.getElementById("submitBtn");
submitSite.addEventListener("click", addBook);
// end of region

// #region clear form function
function clearForm() {
  bookmarkInput.value = ``;
  siteUrlInput.value = ``;
}
// end of region

// start of region view sites list
function viewSites() {
  let content = ``;

  for (var i = 0; i < sitesList.length; i++) {
    content += `
    <tr>
    <td>${i + 1}</td>
    <td>${sitesList[i].siteName}</td>
    <td>${sitesList[i].siteUrl}</td>
    <td>
      <button class="btn btn-outline-warning" onclick="updateSite(${i})" >
        <i class="fa fa-edit"></i>
      </button>
    </td>
    <td>
      <button class="btn btn-outline-danger" onclick="deletSite(${i})" >
        <i class="fa fa-trash"></i>
      </button>
    </td>
  </tr>`;
  }
  document.getElementById("tBody").innerHTML = content;
}
// end of region

// start of region delete function
function deletSite(index) {
  sitesList.splice(index, 1);
  localStorage.setItem("site", JSON.stringify(sitesList));
  viewSites();
}
// end of region

// start of region serch function
function serchSites() {
  let serchValue = searchInput.value;
  //////////////////////////
  let content = ``;
  for (var i = 0; i < sitesList.length; i++) {
    if (
      sitesList[i].siteName.toLowerCase().includes(serchValue.toLowerCase())
    ) {
      content += ` 
        <tr>
        <td>${i + 1}</td>
        <td>${sitesList[i].siteName}</td>
        <td>${sitesList[i].siteUrl}</td>
        <td>
          <button class="btn btn-outline-warning">
            <i class="fa fa-edit"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-outline-danger" onclick="deletSite(${i})" >
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>`;
    }
    document.getElementById("tBody").innerHTML = content;
  }
}
// end of region

// start of region to get sites from locals torage
if (localStorage.getItem("site") != null) {
  sitesList = JSON.parse(localStorage.getItem("site"));
  viewSites();
}
//  start of region add sites list

// start of region update function
function updateSite(siteIndex) {
  indexUpdate = siteIndex;
  let curentSite = sitesList[siteIndex];

  bookmarkInput.value = curentSite.siteName;
  siteUrlInput.value = curentSite.siteUrl;
  updateBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
}

let updateSites = document.getElementById("updateBtn");
updateSites.addEventListener("click", addUpdate);

function addUpdate() {
  let site = {
    siteName: bookmarkInput.value,
    siteUrl: siteUrlInput.value,
  };
  sitesList.splice(indexUpdate, 1, site);
  localStorage.setItem("site", JSON.stringify(sitesList));
  viewSites();
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
  clearForm();
}

let clearLocal = document.getElementById("clearAllSites");
clearLocal.addEventListener("click", clearLocalSites);

function clearLocalSites() {
  localStorage.clear();
  sitesList = [];
  viewSites();
}

let validName = document.getElementById("bookmarkInput");
validName.addEventListener("input", validationName);

let userMassega = document.getElementById("userMassega");

function validationName() {
  let text = bookmarkInput.value;
  let regexName = /^([A-Z]|[a-z]){3,15}$/;
  if (regexName.test(text)) {
    bookmarkInput.classList.add("is-valid");
    bookmarkInput.classList.remove("is-invalid");
    userMassega.classList.add("d-none");
    return true;
  } else {
    bookmarkInput.classList.add("is-invalid");
    bookmarkInput.classList.remove("is-valid");
    userMassega.classList.remove("d-none");
    return false;
  }
}

let validUrl = document.getElementById("url");
validUrl.addEventListener("input", validationURL);

let urlMassega = document.getElementById("urlMassega");

function validationURL() {
  let text = siteUrlInput.value;
  let regexUrl = /^(ftp|http|https):\/\/[^ "]+$/;
  if (regexUrl.test(text)) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    urlMassega.classList.add("d-none");
    return true;
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    urlMassega.classList.remove("d-none");
    return false;
  }
}
