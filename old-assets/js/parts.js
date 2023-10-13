const getYear = () => {
  const d = new Date()
  return d.getFullYear()
}

document.getElementById('verified').innerHTML = `<img src="assets/images/verified/verified${Math.floor(Math.random() * 51) + 1}.png" class="verified" alt="Verified Bitches!">`
document.getElementById('copyright').innerHTML = getYear()