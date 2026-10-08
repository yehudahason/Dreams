import { searchWord2, matchResult } from "./searchWord2.js";

function testSearchResult() {
  const text = `
    רש"י פירש את הפסוק.
    רשי כתב פירוש נוסף.
    הרמב"ם מסביר את ההלכה.
    חלום טוב הוא סימן טוב.
    דיין האמת.
  `;

  const tests = [
    { query: "רשי", expected: 1 },
    { query: 'רש"י', expected: 1 },
    { query: "רמבם", expected: 1 },
    { query: "חלום", expected: 1 },
    { query: "דיין", expected: 1 },
    { query: "מילהשלאקיימת", expected: 0 },
  ];

  for (const { query, expected } of tests) {
    const results = searchWord2(text, query);
    const passed = results.length === expected;

    console.log(
      `${passed ? "✅ PASS" : "❌ FAIL"} | "${query}" | Expected: ${expected}, Got: ${results.length}`,
    );

    if (!passed) {
      console.log("Results:", results);
    }
  }
}

testSearchResult();
