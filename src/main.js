import "./app.postcss";
import App from "./App.svelte";
import '@milkdown/theme-nord/style.css';

const app = new App({
  target: document.getElementById("app"),
});

export default app;
