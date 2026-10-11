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
  if (commonWords.includes(query)) return;

  const matches1 = searchWord3(booksArray[0], query);
  const matches2 = searchWord3(booksArray[1], query);
  const matches3 = searchWord3(booksArray[2], query);
  const matches4 = searchWord3(booksArray[3], query);

  searchDiv.style.visibility = "visible";

  updateResults(text1El, btn1, matches1, "ברכות");
  updateResults(text2El, btn2, matches2, "FXP");
  updateResults(text3El, btn3, matches3, "כדורינט");
  updateResults(text4El, btn4, matches4, "sodot.tv");
};
