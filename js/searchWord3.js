function normalizeWord(word) {
  return word
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/["'״׳]/g, "")
    .toLowerCase();
}

export function matchResult(a, b) {
  if (a === b) return true;

  if (a.length < b.length) return false;
  if (a.length - b.length > 2) return false;

  return a.includes(b);
}

const WORD_REGEX = /[\p{L}\p{M}\p{N}"'״׳]+/gu;
const LETTER = /[\p{L}\p{N}]/u;

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Search the whole phrase without splitting it
function phraseRegex(query) {
  const normalized = normalizeWord(query).trim().replace(/\s+/g, " ");

  if (!normalized) return null;

  const parts = [...normalized].map((char) => {
    if (char === " ") return "\\s+";

    if (LETTER.test(char)) {
      return `${escapeRegex(char)}[\\p{M}"'״׳]*`;
    }

    return escapeRegex(char);
  });

  return new RegExp(
    `(?<![\\p{L}\\p{M}\\p{N}])${parts.join("")}(?![\\p{L}\\p{M}\\p{N}])`,
    "giu",
  );
}

// Get 5 words before the match
function getStartIndex(text, index, wordsBefore = 5) {
  const prefix = text.slice(0, index);
  const positions = [];

  for (const match of prefix.matchAll(WORD_REGEX)) {
    positions.push(match.index);

    if (positions.length > wordsBefore) {
      positions.shift();
    }
  }

  return positions.length ? positions[0] : index;
}

// Get 50 words after the match
function getEndIndex(text, index, wordsAfter = 50) {
  const regex = new RegExp(WORD_REGEX.source, "gu");
  regex.lastIndex = index;

  let end = index;

  for (let n = 0; n < wordsAfter; n++) {
    const match = regex.exec(text);

    if (!match) break;

    end = match.index + match[0].length;
  }

  return end;
}

// Merge overlapping results
function mergeRanges(ranges, text) {
  if (!ranges.length) return [];

  ranges.sort((a, b) => a[0] - b[0]);

  const merged = [ranges[0].slice()];

  for (const [start, end] of ranges.slice(1)) {
    const last = merged[merged.length - 1];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }

  return merged.map(([start, end]) => text.slice(start, end).trim());
}
export function searchWord3(text, query) {
  if (!text || !query?.trim()) return [];

  const regex = phraseRegex(query);
  if (!regex) return [];

  const exactRanges = [];
  const fuzzyRanges = [];

  // Exact matches first
  for (const match of text.matchAll(regex)) {
    const start = getStartIndex(text, match.index, 5);
    const end = getEndIndex(text, match.index + match[0].length, 50);

    exactRanges.push([start, end]);
  }

  // Fuzzy matching only for single-word queries
  const normalized = normalizeWord(query.trim());

  if (!/\s/u.test(normalized)) {
    for (const match of text.matchAll(WORD_REGEX)) {
      const candidate = normalizeWord(match[0]);

      if (candidate !== normalized && matchResult(candidate, normalized)) {
        fuzzyRanges.push([
          getStartIndex(text, match.index, 5),
          getEndIndex(text, match.index + match[0].length, 50),
        ]);
      }
    }
  }

  // Merge exact and fuzzy results separately
  const exact = mergeRanges(exactRanges, text);
  const fuzzy = mergeRanges(fuzzyRanges, text);

  // Remove fuzzy results already covered by exact results
  const seen = new Set(exact);

  const uniqueFuzzy = fuzzy.filter((result) => {
    if (seen.has(result)) return false;

    seen.add(result);
    return true;
  });

  // Exact matches first, fuzzy matches second
  return [...exact, ...uniqueFuzzy];
}
