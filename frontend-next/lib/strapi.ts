import qs from "qs";

export const STRAPI_BASE_URL =
  process.env.STRAPI_API_URL || "http://localhost:1337";

const QUERY_HOME_PAGE = {
  populate: {
    sections: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true,
            },
          },
        },
      },
    },
  },
};

export async function getHomePage() {
  const query = qs.stringify(QUERY_HOME_PAGE, { encodeValuesOnly: true });
  const response = await getStrapiData(`/api/home-page?${query}`);
  return response?.data;
}

export async function getStrapiData(url: string) {
  try {
    const res = await fetch(`${STRAPI_BASE_URL}${url}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data from Strapi: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
    return null;
  }
}

export async function registerUserService(userData: object) {
  const url = `${STRAPI_BASE_URL}/api/auth/local/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function loginUserService(userData: object) {
  const url = `${STRAPI_BASE_URL}/api/auth/local`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }
}
