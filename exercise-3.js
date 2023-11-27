/*
    Exercise 3 - Ricerca paesi per lingua

    Studiati come funzionano le API di 
    https://restcountries.com/.
    Crea una pagina HTML in cui l’utente può inserire 
    del testo ed effettuare una ricerca di paesi a 
    partire dalla lingua. Dopo che l’utente ha scritto 
    del testo e dato conferma d’invio (con un bottone), 
    interroga l’API e crea una lista di cards, di cui 
    ciascuna card è un risultato della ricerca. Ogni 
    card rappresenta un paese cercato a partire dalla 
    stringa inserita dall’utente (una lingua parlata 
    nel paese).
*/

const browseCountries = async (value) => {
  const div = document.getElementById("countries");
  try {
    const response = await fetch(`https://restcountries.com/v3.1/lang/${value}`);
    let countries = await response.json();
    countries = countries.sort((a, b) => a.name.official < b.name.official ? -1 : 1);
    if (!countries) {
    div.innerHTML = "Sorry, no country speaks this language";
  }
  const printCountries = countries.forEach(({ name: { official: name }, languages, flags }) => {
    const keys = Object.keys(languages);
    const values = Object.values(languages);
    console.log(values);
    const languageList = `${values}`;
    div.innerHTML += `
            <figure>
                <h3>${name}</h3>
                <img src="${flags.png}" alt="${flags.alt}">
                <p>Language${keys.length > 1 ? "s" : ""}: ${languageList}</p>
            </figure>
        `;
  });
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("load", () => {
  const input = document.querySelector("input");
  const button = document.querySelector("button");
  const div = document.getElementById("countries");
  button.addEventListener("click", () => {
    div.innerHTML = "";
    const value = input.value.trim();
    browseCountries(value);
  });
  input.addEventListener("keypress", (event) => {
    div.innerHTML = "";
    const value = input.value.trim();
    if (event.key === "Enter") {
      browseCountries(value);
    }
  });
});
