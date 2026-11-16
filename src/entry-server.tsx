import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import i18n from "./i18n";
import App from "./App";

/** Build-time prerender of a route in the given language. */
export async function render(url: string, lang: "en" | "de" = "en") {
  await i18n.changeLanguage(lang);
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
