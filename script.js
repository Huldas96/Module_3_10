// Adding active state to the nav links

document.querySelectorAll("[data-link], [data-page]").forEach( item =>{
    item.addEventListener("click", e => {

        document.querySelector("[data-link].active").classList.toggle("active"); // remove the class "active" from last page visited
        item.classList.toggle("active"); // Adds the class "active"

    })
})


const settingsPage = document.getElementById("settings");
const plantsPage = document.getElementById("plants");


function getContent(fragmentId, callback){ // Function that fetches the content that will be displayed on each page

    let username = localStorage.getItem("firstName"); // Here we set the username as the first name from LocalStorage

    if(!username) { // Default name if nothing is inside localStorage
        username = "Stranger";
    }

    var pages = {
        home: `<h1>Welcome ${username}!</h1>`,
        plants: "<h1>Plants</h1>" + plantsPage.innerHTML,
        settings: "<h1>Settings</h1>" +  settingsPage.innerHTML
    };

    callback(pages[fragmentId]);
}
  
function setupEventListeners() {

    const saveBtn = document.querySelector("#btnSave");
    const firstName = document.querySelector("#inPutFirstName");
    const lastName = document.querySelector("#inPutLastName");

    if(saveBtn){
        saveBtn.addEventListener("click", function() {

            console.log("something");
        
            let newFirstName = firstName.value;
            let newLastName = lastName.value;
        
            localStorage.setItem("firstName", newFirstName);
            localStorage.setItem("lastName", newLastName);
        
        })
    }
}
  
function loadContent(){

    var contentDiv = document.getElementById("app"),
        fragmentId = location.hash.substr(1);

    getContent(fragmentId, function (content) {
        contentDiv.innerHTML = content;

        setupEventListeners()
    });

}

if(!location.hash) {
location.hash = "#home"; // Here I use the Location API to set a default location (home)
}

loadContent();

window.addEventListener("hashchange", loadContent)