
import { expect, test, type Route } from "@playwright/test";

const mockGeoApi = async (route: Route) => {
  const requestUrl = route.request().url();

  console.log("🌍 GEO REQUEST:", requestUrl);

  const url = new URL(requestUrl);

  // Autocomplete : régions
  if (url.pathname === "/regions" && url.searchParams.has("nom")) {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          nom: "Occitanie",
          code: "76",
      },
      ]),
    });
    return;
  }

  // Autocomplete : départements
  if (
    url.pathname === "/departements" &&
    url.searchParams.has("nom")
  ) {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          nom: "Hérault",
          code: "34",
          codeRegion: "76",
        },
      ]),
    });
    return;
  }

  // Autocomplete : communes
  if (url.pathname === "/communes" && url.searchParams.has("nom")) {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          nom: "Montpellier",
          code: "34172",
          codeDepartement: "34",
          codeRegion: "76",
        },
      ]),
    });
    return;
  }

  // Résolution du département par son code
  if (url.pathname === "/departements/34") {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        nom: "Hérault",
        code: "34",
        codeRegion: "76",
      }),
    });
    return;
  }

  // Résolution de la région par son code
  if (url.pathname === "/regions/76") {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        nom: "Occitanie",
        code: "76",
      }),
    });
    return;
  }

  // Toute requête Geo API inattendue doit échouer.
  await route.fulfill({
    status: 404,
    contentType: "application/json",
    body: JSON.stringify({
      error: "Unexpected Geo API request in test",
    }),
  });
};

test.describe("Location search", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("https://geo.api.gouv.fr/**", mockGeoApi);
  });

  test("searching Montpellier redirects to its full location URL", async ({
    page,
  }) => {
    await page.goto("/");

    const input = page.getByPlaceholder("Rechercher un marché...");

    await input.fill("montpellier");

    const suggestion = page.getByRole("button", {
      name: /Montpellier/i,
    });

    await expect(suggestion).toBeVisible();
    await suggestion.click();

    await expect(page).toHaveURL(
      /\/occitanie\/herault\/montpellier$/
    );
  });

  test("browser back button returns to the home page", async ({
    page,
  }) => {
    await page.goto("/");

    const input = page.getByPlaceholder("Rechercher un marché...");

    await input.fill("montpellier");

    const suggestion = page.getByRole("button", {
      name: /Montpellier/i,
    });

    await expect(suggestion).toBeVisible();
    await suggestion.click();

    await expect(page).toHaveURL(
      /\/occitanie\/herault\/montpellier$/
    );

    await page.goBack();

    await expect(page).toHaveURL("/");
  });
});

