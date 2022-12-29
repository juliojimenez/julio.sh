const rssUrl = 'https://fosstodon.org/@julioj.rss'

fetch(rssUrl)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    console.log(data)
    const items = data.querySelectorAll('item')
    let html = ``;
    items.forEach(el => {
      html += `
        <article>
          ${decode(el.querySelector('description').innerHTML)}
        </article>
      `
    })
    const mastodon = document.getElementById('mastodon')
    mastodon.insertAdjacentHTML('beforeend', html);
  });