import { searchWord2 } from "./searchWord2.js";

let text1;
let text2;
let text3;
let text4;
let query;
const text1El = document.querySelector(".text1El");
const text2El = document.querySelector(".text2El");
const text3El = document.querySelector(".text3El");
const text4El = document.querySelector(".text4El");
const form = document.querySelector("#searchForm");

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
  const searchArray = query
    .replace(/"/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .filter((el) => !commonWords.includes(el));

  const array1 = new Set();
  const array2 = new Set();
  const array3 = new Set();
  const array4 = new Set();

  searchArray.forEach((item) => {
    const matches1 = searchWord2(text1, item);
    matches1.forEach((m) => array1.add(m));

    const matches2 = searchWord2(text2, item);
    matches2.forEach((m) => array2.add(m));
    const matches3 = searchWord2(text3, item);
    matches3.forEach((m) => array3.add(m));
    const matches4 = searchWord2(text4, item);
    matches4.forEach((m) => array4.add(m));
  });
  // console.log(array1);
  text1El.innerHTML = `
  <h4>מסכת ברכות</h4>
   ${array1.size === 0 ? `<h5>אין תוצאות</h5>` : [...array1].join("<br/>")}`;
  text2El.innerHTML = ` 
  <h4>FXP</h4>
  ${array2.size === 0 ? `<h5>אין תוצאות</h5>` : [...array2].join("<br/>")}`;
  text3El.innerHTML = `
  <h4>כדורינט</h4>
   ${array3.size === 0 ? ` <h5>אין תוצאות</h5>` : [...array3].join("<br/>")}`;
  text4El.innerHTML = `
  <h4>sodot.tv</h4>
   ${array4.size === 0 ? `<h5>אין תוצאות</h5> ` : [...array4].join("<br/>")}`;
};
async function fetchBooks() {
  try {
    const urls = [
      "https://yehudahason.github.io/Dreams/txt/brachot.txt",
      "https://yehudahason.github.io/Dreams/txt/fxp.txt",
      "https://yehudahason.github.io/Dreams/txt/kaduri.txt",
      "https://yehudahason.github.io/Dreams/txt/sodot.txt",
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
