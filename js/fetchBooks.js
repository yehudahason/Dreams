export default async function fetchBooks() {
  try {
    //URL for production
    const urls = [
      "https://dreams.pitron-halomot.org/txt/roe-text.txt",
      "https://dreams.pitron-halomot.org/txt/fxp.txt",
      "https://dreams.pitron-halomot.org/txt/kaduri.txt",
      "https://dreams.pitron-halomot.org/txt/sodot.txt",
      "https://dreams.pitron-halomot.org/txt/hai-text.txt",
    ];

    //URL For local Dev
    const urlsLocal = [
      "../txt/roe-text.txt",
      "../txt/fxp.txt",
      "../txt/kaduri.txt",
      "../txt/sodot.txt",
      "../txt/hai-text.txt",
    ];
    let text1;
    let text2;
    let text3;
    let text4;
    let text5;
    const responses = await Promise.all(urls.map((url) => fetch(url)));

    // Check HTTP errors
    if (responses.some((res) => !res.ok)) {
      throw new Error("Failed to fetch one or more books");
    }

    [text1, text2, text3, text4, text5] = await Promise.all(
      responses.map((res) => res.text()),
    );

    return [text1, text2, text3, text4, text5];
  } catch (err) {
    console.error("Error fetching books:", err);
  }
}
