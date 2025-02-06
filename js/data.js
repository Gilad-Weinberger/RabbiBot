import {
  hebrewLetters,
  torahChaptersCount,
  gemaraPagesCount,
} from "./dictsData.js";

function createBibleList() {
  const bereshitLetters = hebrewLetters.slice(0, torahChaptersCount.bereshit);
  const shmotLetters = hebrewLetters.slice(0, torahChaptersCount.shmot);
  const vaikraLetters = hebrewLetters.slice(0, torahChaptersCount.vaikra);
  const bamidbarLetters = hebrewLetters.slice(0, torahChaptersCount.bamidbar);
  const devarimLetters = hebrewLetters.slice(0, torahChaptersCount.devarim);

  const bereshit = bereshitLetters.map(
    (letter) => `https://he.wikisource.org/wiki/בראשית_${letter}/כתיב#${letter}`
  );
  const shmot = shmotLetters.map(
    (letter) => `https://he.wikisource.org/wiki/שמות_${letter}/כתיב#${letter}`
  );
  const vaikra = vaikraLetters.map(
    (letter) => `https://he.wikisource.org/wiki/ויקרא_${letter}/כתיב#${letter}`
  );
  const bamidbar = bamidbarLetters.map(
    (letter) => `https://he.wikisource.org/wiki/במדבר_${letter}/כתיב#${letter}`
  );
  const devarim = devarimLetters.map(
    (letter) => `https://he.wikisource.org/wiki/דברים_${letter}/כתיב#${letter}`
  );

  const torah = [...bereshit, ...shmot, ...vaikra, ...bamidbar, ...devarim];
  const bible = [...torah];
  return bible;
}
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
}

const bible = createBibleList();
const talmud_bavli = createTalmudBavliList();

const all_web_urls = [...bible, ...talmud_bavli];

console.log(talmud_bavli, talmud_bavli.length);
