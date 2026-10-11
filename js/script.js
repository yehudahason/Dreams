import { searchWord3 } from "./searchWord3.js";

let text1;
let text2;
let text3;
let text4;
let query;
const text1El = document.querySelector(".text1El");
const text2El = document.querySelector(".text2El");
const text3El = document.querySelector(".text3El");
const text4El = document.querySelector(".text4El");
const btn1 = document.querySelector(".btn-1");
const btn2 = document.querySelector(".btn-2");
const btn3 = document.querySelector(".btn-3");
const btn4 = document.querySelector(".btn-4");
const form = document.querySelector("#searchForm");
const searchDiv = document.querySelector(".main-container-search");

btn1.addEventListener("click", () => {
  text1El.style.display = text1El.style.display === "none" ? "block" : "none";

  btn1.innerText =
    text1El.style.display === "none" ? "הצג ברכות" : "הסתר ברכות";
});
btn2.addEventListener("click", () => {
  text2El.style.display = text2El.style.display === "none" ? "block" : "none";

  btn2.innerText = text2El.style.display === "none" ? "הצג FXP" : "הסתר FXP";
});
btn3.addEventListener("click", () => {
  text3El.style.display = text3El.style.display === "none" ? "block" : "none";

  btn3.innerText =
    text3El.style.display === "none" ? "הצג כדורינט" : "הסתר כדורינט";
});
btn4.addEventListener("click", () => {
  text4El.style.display = text4El.style.display === "none" ? "block" : "none";

  btn4.innerText =
    text4El.style.display === "none" ? "הצג sodot.tv" : "הסתר sodot.tv";
});
const baseUrl = "https://yehudahason.github.io/Dreams";
form.addEventListener("submit", (e) => {
  e.preventDefault();

  query = document.querySelector("#search").value;

  // console.log(query);
  handleSearch(e);
});

const handleSearch = (e) => {
  if (!query.trim()) return;
  if (query.length < 2) return;
  const commonWords = [
    "הרואה",
    "רואה",
    "הרו",
    "בחלום",
    "חלום",
    "של",
    "לי",
    "יש",
    "אחר",
    "אומר",
  ];

  if (commonWords.includes(query)) {
    return;
  }
  // const searchArray = query
  //   .replace(/["']/g, "")
  //   .split(/\s+/)
  //   .map((word) => {
  //     switch (word) {
  //       case "ים":
  //         return "בים";
  //       case "הר":
  //         return ["עולה להר", "ההר"];
  //       case "נחל":
  //       case "נהר":
  //         return ["נהר", "נחל"];
  //       case "מים":
  //         return "במים";

  //       case "":
  //         return "";
  //       default:
  //         return word;
  //     }
  //   })
  //   .flat()
  //   .filter(Boolean)
  //   .filter((el) => !commonWords.includes(el));

  // const array1 = new Set();
  // const array2 = new Set();
  // const array3 = new Set();
  // const array4 = new Set();

  // searchArray.forEach((item) => {
  //   const matches1 = searchWord3(text1, item);
  //   matches1.forEach((m) => array1.add(m));

  //   const matches2 = searchWord3(text2, item);
  //   matches2.forEach((m) => array2.add(m));
  //   const matches3 = searchWord3(text3, item);
  //   matches3.forEach((m) => array3.add(m));
  //   const matches4 = searchWord3(text4, item);
  //   matches4.forEach((m) => array4.add(m));
  // });

  const matches1 = searchWord3(text1, query);
  const matches2 = searchWord3(text2, query);
  const matches3 = searchWord3(text3, query);
  const matches4 = searchWord3(text4, query);

  // console.log(array1);
  searchDiv.style.visibility = "visible";
  // text1El.innerHTML = `
  // <h4>מסכת ברכות</h4>
  //  ${array1.size === 0 ? `<h5>אין תוצאות</h5>` : [...array1].join("<br/><p>*</p>")}`;
  // text2El.innerHTML = `
  // <h4>FXP</h4>
  // ${array2.size === 0 ? `<h5>אין תוצאות</h5>` : [...array2].join("<br/><p>*</p>")}`;
  // text3El.innerHTML = `
  // <h4>כדורינט</h4>
  //  ${array3.size === 0 ? ` <h5>אין תוצאות</h5>` : [...array3].join("<br/><p>*</p>")}`;
  // text4El.innerHTML = `
  // <h4>sodot.tv</h4>
  //  ${array4.size === 0 ? `<h5>אין תוצאות</h5> ` : [...array4].join("<br/><p>*</p>")}`;

  text1El.innerHTML = `
  <h4>מסכת ברכות</h4>
   ${matches1.length === 0 ? `<h5>אין תוצאות</h5>` : [...matches1].join("<br/><p>*</p>")}`;
  text2El.innerHTML = ` 
  <h4>FXP</h4>
  ${matches2.length === 0 ? `<h5>אין תוצאות</h5>` : [...matches2].join("<br/><p>*</p>")}`;
  text3El.innerHTML = `
  <h4>כדורינט</h4>
   ${matches3.length === 0 ? ` <h5>אין תוצאות</h5>` : [...matches3].join("<br/><p>*</p>")}`;
  text4El.innerHTML = `
  <h4>sodot.tv</h4>
   ${matches4.length === 0 ? `<h5>אין תוצאות</h5> ` : [...matches4].join("<br/><p>*</p>")}`;
};
async function fetchBooks() {
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

    const responses = await Promise.all(urls.map((url) => fetch(url)));

    // Check HTTP errors
    if (responses.some((res) => !res.ok)) {
      throw new Error("Failed to fetch one or more books");
    }

    [text1, text2, text3, text4] = await Promise.all(
      responses.map((res) => res.text()),
    );
  } catch (err) {
    console.error("Error fetching books:", err);
  }
}
await fetchBooks();
