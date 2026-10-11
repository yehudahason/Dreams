export default async function fetchBooks() {
  try {
    const urls = [
      "https://dreams.pitron-halomot.org/txt/roe-text.txt",
      "https://dreams.pitron-halomot.org/txt/fxp.txt",
      "https://dreams.pitron-halomot.org/txt/kaduri.txt",
      "https://dreams.pitron-halomot.org/txt/sodot.txt",
    ];
    const urls2 = [
      "../txt/brachot.txt",
      "../txt/fxp.txt",
      "../txt/kaduri.txt",
      "../txt/sodot.txt",
    ];
    let text1;
    let text2;
    let text3;
    let text4;
    const responses = await Promise.all(urls.map((url) => fetch(url)));

    // Check HTTP errors
    if (responses.some((res) => !res.ok)) {
      throw new Error("Failed to fetch one or more books");
    }

    [text1, text2, text3, text4] = await Promise.all(
      responses.map((res) => res.text()),
    );

    return [text1, text2, text3, text4];
  } catch (err) {
    console.error("Error fetching books:", err);
  }
}
