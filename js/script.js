import { searchWord3 } from "./searchWord3.js";
import updateResults from "./updateResults.js";
import fetchBooks from "./fetchBooks.js";
import setupToggle from "./setupToggle.js";

const btn1 = document.querySelector(".btn-1");
const btn2 = document.querySelector(".btn-2");
const btn3 = document.querySelector(".btn-3");
const btn4 = document.querySelector(".btn-4");
const text1El = document.querySelector(".text1El");
const text2El = document.querySelector(".text2El");
const text3El = document.querySelector(".text3El");
const text4El = document.querySelector(".text4El");
const form = document.querySelector("#searchForm");
setupToggle(btn1, text1El, "ברכות");
setupToggle(btn2, text2El, "FXP");
setupToggle(btn3, text3El, "כדורינט");
setupToggle(btn4, text4El, "sodot.tv");

let query;
const searchDiv = document.querySelector(".main-container-search");

const baseUrl = "https://yehudahason.github.io/Dreams";
form.addEventListener("submit", (e) => {
  e.preventDefault();

  query = document.querySelector("#search").value;

  // console.log(query);
  handleSearch(e);
});
const booksArray = await fetchBooks();

const handleSearch = () => {
  query = query.trim();

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
    const warning = ["ביטוי שכיח מדי חפש משהו אחר"];
    updateResults(text1El, btn1, warning, "ברכות");
    searchDiv.style.visibility = "visible";
    return;
  }

  //For qeury longer that 9 letters split to array
  if (query.length >= 9) {
    const searchArray = query
      .replace(/["']/g, "")
      .split(/\s+/)
      .flatMap((word) => {
        switch (word) {
          case "ים":
          case "בים":
            return ["ים", "בים"];

          case "הר":
          case "בהר":
          case "להר":
            return ["הר", "בהר", "להר"];

          case "נחל":
          case "נהר":
            return ["נחל", "נהר"];

          case "מים":
          case "במים":
            return ["מים", "במים"];

          default:
            return [word];
        }
      })
      .filter(Boolean)
      .filter((el) => !commonWords.includes(el));

    const searchBook = (book) => [
      ...new Set(searchArray.flatMap((word) => searchWord3(book, word))),
    ];
    const matches1 = searchBook(booksArray[0]);
    const matches2 = searchBook(booksArray[1]);
    const matches3 = searchBook(booksArray[2]);
    const matches4 = searchBook(booksArray[3]);

    searchDiv.style.visibility = "visible";
    //If No results
    if (
      matches1.length === 0 &&
      matches2.length === 0 &&
      matches3.length === 0 &&
      matches4.length === 0
    ) {
      updateResults(text1El, btn1, ["אין תוצאות חפש משהו אחר"], "ברכות");
      return;
    }
    updateResults(text1El, btn1, matches1, "ברכות");
    updateResults(text2El, btn2, matches2, "FXP");
    updateResults(text3El, btn3, matches3, "כדורינט");
    updateResults(text4El, btn4, matches4, "sodot.tv");
  }
  //Already done search so return
  if (query.length >= 9) return;
  const matches1 = searchWord3(booksArray[0], query);
  const matches2 = searchWord3(booksArray[1], query);
  const matches3 = searchWord3(booksArray[2], query);
  const matches4 = searchWord3(booksArray[3], query);

  searchDiv.style.visibility = "visible";
  //No results return
  if (
    matches1.length === 0 &&
    matches2.length === 0 &&
    matches3.length === 0 &&
    matches4.length === 0
  ) {
    updateResults(text1El, btn1, ["אין תוצאות חפש משהו אחר"], "ברכות");
    return;
  }

  updateResults(text1El, btn1, matches1, "ברכות");
  updateResults(text2El, btn2, matches2, "FXP");
  updateResults(text3El, btn3, matches3, "כדורינט");
  updateResults(text4El, btn4, matches4, "sodot.tv");
};
