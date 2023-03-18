const formInput = document.getElementById("inputForm");
formInput.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchTerm = document.getElementById("searchInput").value;
  const sortBy = document.querySelector("input[name='sortBy']:checked").value;
  const limit = document.getElementById("limit").value
  await fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${limit}`).then((data) => {
    return data.json()
  }).then((data) => {
    if (searchTerm === '') {
      showAlert('Plese enter the search term')
      setTimeout(() => {
        document.querySelector('.alert').remove();
      }, 3000);
    }
    else {
      let output = ``;
      data.data.children.map((element) => {
        let post = element.data
        let image;
        if (post.preview) {
          image = post.preview.images[0].source.url;
        }
        else {
          image = "./reddit.png"
        }
        output += `<div class="card">
      <img src=${image} id="image" alt="">
      <div class="card-text">
      <h3 id="heading">${post.title}</h3>
      <p id="text">${post.selftext.substring(0, 200)}...</p>
      <button type="button" id="redditLink"><a target="_blank" href="${post.url}">Show more</a></button>
      </div>
      </div>`
      })
      document.getElementById('result').innerHTML = output
    }
  }).catch((err) => {
    console.log(err)
    showAlert('Some error occured')
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  })
})

function showAlert(message) {
  let alert = document.createElement("div");
  alert.className = "alert";
  alert.appendChild(document.createTextNode(message));
  let wrapper = document.getElementsByClassName('wrapper')[0];
  document.body.insertBefore(alert, wrapper)
}