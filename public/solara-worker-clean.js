export default {
  async fetch(request) {
    const url = new URL(request.url);
    const API_URL = "https://music-api.gdstudio.xyz/api.php";

    const apiUrl = new URL(API_URL);
    for (const [key, value] of url.searchParams) {
      if (key !== "s" && key !== "target") {
        apiUrl.searchParams.set(key, value);
      }
    }

    if (!apiUrl.searchParams.has("types")) {
      return new Response(JSON.stringify({ error: "Missing types" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    const upstream = await fetch(apiUrl.toString(), {
      headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" }
    });

    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=300"
      }
    });
  }
};
