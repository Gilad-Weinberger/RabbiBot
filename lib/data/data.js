import {
  hebrewLetters,
  bibleChaptersCount,
  gemaraPagesCount,
} from "./dictsData.js";

// Create Bible List (Torah and Tanakh)
function createBibleList() {
  const bible = [];

  for (const book of Object.keys(bibleChaptersCount)) {
    const chapters = bibleChaptersCount[book];
    const bookLinks = [];

    for (let i = 1; i <= chapters; i++) {
      const letter = hebrewLetters[i - 1];
      bookLinks.push(
        `https://he.wikisource.org/wiki/${book}_${letter}/כתיב#${letter}`
      );
    }

    bible.push(...bookLinks);
  }
  return bible;
}

// Create Talmud Bavli List
function createTalmudBavliList() {
  const masechtot = Object.keys(gemaraPagesCount);
  let masechtotUrls = {};

  masechtot.forEach((masechet) => {
    const pagesCount = gemaraPagesCount[masechet] - 1;
    masechtotUrls[masechet] = Array.from({ length: pagesCount }, (_, i) => [
      `https://he.wikisource.org/wiki/${masechet}_${hebrewLetters[i + 1]}_א`,
      `https://he.wikisource.org/wiki/${masechet}_${hebrewLetters[i + 1]}_ב`,
    ]).flat();
  });

  const talmud_bavli = Object.values(masechtotUrls).flat();
  return talmud_bavli;
}

const bible = createBibleList();
const talmudBavli = createTalmudBavliList();

const allWebUrls = [...bible, ...talmudBavli];

console.log(allWebUrls, allWebUrls.length);
