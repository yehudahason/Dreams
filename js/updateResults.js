export default function updateResults(element, btn, matches, title) {
  const hasResults = matches.length > 0;

  element.style.display = hasResults ? "block" : "none";

  btn.innerText = hasResults ? `הסתר ${title}` : `הצג ${title}`;

  element.innerHTML = `
    <h4>${title}</h4>
    ${hasResults ? matches.join("<br/><p>*</p>") : "<h5>אין תוצאות</h5>"}
  `;
}
