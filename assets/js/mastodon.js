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
    console.log(items)
    let html = `<h3>Recent Toots &#128168;</h3>`;
    items.forEach(el => {
      const img = el.getElementsByTagName('media:content').length > 0 ? `<img src="${el.getElementsByTagName('media:content')[0].attributes[0].nodeValue}" class="card-img-bottom" alt="Toot Image">` : ''
      html += `
        <div class="card">
          <div class="card-body">
            ${decode(el.querySelector('description').innerHTML)}
            <p class="card-text"><small class="text-muted"><a href="${el.querySelector('link').innerHTML}" target="_blank">${el.querySelector('pubDate').innerHTML}</a></small></p>
          </div>
          ${img}
        </div>
      `
    })
    const mastodon = document.getElementById('mastodon')
    mastodon.insertAdjacentHTML('beforeend', html)
  })