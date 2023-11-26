/*
    Exercise 2

    Studiati come funzionano le API 
    di https://v2.jokeapi.dev/.
    Crea una pagina HTML in cui l’utente 
    può decidere quante barzellette visualizzare. 
    Dopo che l’utente ha deciso e dato conferma 
    d’invio (con un bottone), interroga l’API e 
    crea una lista di barzellette che contiene 
    tante barzellette (a tema Programming) quante 
    ne ha richieste l’utente.
*/

const request = async () => {
  let jokeToPrint;
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Programming")
      .then((response) => response.json())
      .then((obj) => {
        const { joke } = obj;
        jokeToPrint = joke;
        if (jokeToPrint === undefined) {
          jokeToPrint = `Sorry, can't fetch this joke.`;
        }
      });
  } catch (error) {
    console.error(error);
  } finally {
    const div = document.getElementById("jokes");
    const figure = document.createElement("figure");
    figure.innerHTML = `${jokeToPrint}`;
    div.appendChild(figure);
  }
};

window.addEventListener("load", () => {
  const input = document.querySelector("input");
  const button = document.querySelector("button");
  const div = document.getElementById("jokes");
  button.addEventListener("click", () => {
    div.innerHTML = "";
    const value = Number(input.value);
    if (isNaN(value)) {
      div.innerHTML = "Please, write a numeric value!";
    } else {
      for (let i = 0; i < value; i++) {
        request();
      }
    }
  });
});
