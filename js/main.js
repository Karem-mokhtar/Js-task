var inputsitename = document.getElementById("siteName");
var inputsiteurl = document.getElementById("webSite");

var links = [];
if (JSON.parse(localStorage.getItem("websites")) !== null) {
  links = JSON.parse(localStorage.getItem("websites"));
  display();
}
function addSite() {
  if (validtionInputs(inputsitename)) {
    var sites = {
      name: inputsitename.value,
      url: inputsiteurl.value,
    };
    links.push(sites);
    localStorage.setItem("websites", JSON.stringify(links));
    display();
    clear();
  }
}
function display() {
  var show = ``;
  for (var i = 0; i < links.length; i++) {
    show += `  <tr>
<td>${i} </td>
<td>${links[i].name}</td>            

<td>
<a target="_blank" href="${links[i].url}">
    <button class="btn btn-primary">Visit</button>
</a>
</td>




<td><button onclick="deleteSite(${i})" class="btn btn-danger">Delete</button> </td>

</tr>`;
  }
  document.getElementById("rowData").innerHTML = show;
}

function deleteSite(siteIndex) {
  links.splice(siteIndex, 1);
  localStorage.setItem("websites", JSON.stringify(links));

  display();
}

function validtionInputs(element) {
  var text = element.value;
  var e = element;
  var regex = {
    siteName: /^[a-z]{3,10}$/i,
    webSite:
      /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
  };

  if (regex[element.id].test(text) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

function clear() {
  inputsitename.value = null;
  inputsiteurl.value = null;
  inputsitename.classList.remove("is-valid");
  inputsiteurl.classList.remove("is-valid");
}
