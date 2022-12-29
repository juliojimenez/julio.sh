const rssUrl = 'https://fosstodon.org/@julioj.rss'

const decode = (str) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = str
  return txt.value
}

fetch(rssUrl)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    console.log(data)
    const items = data.querySelectorAll('item')
    let html = `<h3>Recent Toots &#128168;</h3>`;
    items.forEach(el => {
      html += `
        <div class="card">
          <div class="card-body">
            ${decode(el.querySelector('description').innerHTML)}
            <p class="card-text"><small class="text-muted">${el.querySelector('pubDate').innerHTML}</small></p>
          </div>
          <img src="${el.querySelector('media|content').getAttribute('url')}" class="card-img-bottom" alt="Toot Image">
        </div>
      `
    })
    const mastodon = document.getElementById('mastodon')
    mastodon.insertAdjacentHTML('beforeend', html);
  });