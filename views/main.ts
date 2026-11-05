// The prototype's entry page. Each view (the crafter, the budget readout, the
// hex battle board) gets its own module here as it is built.
const app = document.querySelector<HTMLElement>("#app");
if (app) {
  app.innerHTML = `
    <h1>The Hollow</h1>
    <p>Prototype. No views are built yet.</p>
  `;
}
