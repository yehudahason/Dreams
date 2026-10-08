export function matchResult(a, b) {
  if (a === b) return true;

  const lenA = a.length;
  const lenB = b.length;

  // ❌ no missing letters
  if (lenA < lenB) return false;

  // ❌ max +2 extra letters
  if (lenA - lenB > 2) return false;

  const index = a.indexOf(b);
  if (index === -1) return false;

  const prefix = index;
  const suffix = lenA - (index + lenB);

  return prefix + suffix <= 2;
}

export const searchWord2 = (text, query) => {
  if (!text || !query) return [];

  const exactRanges = [];
  const fuzzyRanges = [];

  const regex = /[\p{L}]+/gu;
  const lowerQuery = query.toLowerCase();

  // ✅ get ALL words once (performance fix)
  const allMatches = [...text.matchAll(regex)];

  allMatches.forEach((match, i) => {
    const word = match[0];
    const lowerWord = word.toLowerCase();

    //  const index = match.index || 0;

    const start = getStartIndex(allMatches, i, 4);
    const end = getEndIndex(allMatches, i, 80);

    if (lowerWord === lowerQuery) {
      exactRanges.push([start, end]);
    } else if (matchResult(lowerWord, lowerQuery)) {
      fuzzyRanges.push([start, end]);
    }
  });

  const exact = mergeRanges(exactRanges, text);
  const fuzzy = mergeRanges(fuzzyRanges, text);

  return [...exact, ...fuzzy];
};

function mergeRanges(ranges, text) {
  if (ranges.length === 0) return [];

  ranges.sort((a, b) => a[0] - b[0]);

  const merged = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const [start, end] = ranges[i];
    const last = merged[merged.length - 1];

    if (start <= last[1] + 50) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }

  return merged.map(([start, end]) => text.substring(start, end).trim());
}

function getStartIndex(matches, currentIndex, wordsBefore = 3) {
  const startWordIndex = Math.max(0, currentIndex - wordsBefore);
  return matches[startWordIndex].index || 0;
}

function getEndIndex(
  matches,
  currentIndex,
  wordsAfter = 8,
  // textLength: number,
) {
  const endWordIndex = Math.min(matches.length - 1, currentIndex + wordsAfter);

  const match = matches[endWordIndex];
  return (match.index || 0) + match[0].length;
}
