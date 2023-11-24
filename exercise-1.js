/*
    Exercise 1

    Studiati come funzionano le API di 
    https://jsonplaceholder.typicode.com/.
    Crea una pagina HTML in cui, dopo aver 
    richiesto dei post all’API, vengono create 
    delle card nel documento: per ogni card 
    mostra titolo e contenuto.
*/


window.addEventListener("load", () => {
  const main = document.querySelector("main");
  let posts;
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((obj) => (posts = obj))
    .catch((error) => console.error(error))
    .finally(() => {
      posts.forEach(({ title, body }) => {
        main.innerHTML += `
         <figure>
             <h3>${title}</h3>
             <div>${body}</div>
         </figure>
        `;
      });
    });
});
