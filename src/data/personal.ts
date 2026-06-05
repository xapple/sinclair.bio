// Personal favorites + hobbies for the optional "Personal" section that can be
// appended to the portfolio page. Imported ONLY by the INCLUDE_PERSONAL-gated
// block in pages/[lang]/portfolio.astro, so when the flag is unset the whole
// section is dropped at build time and none of this content reaches dist/.
//
// Kept out of i18n/translations.ts on purpose: exclusion stays *structural*
// (this module has a single importer — the gated section) rather than relying
// on no built page happening to render these strings. Delete this file plus the
// gated block to remove the feature entirely.

import type { Language } from '../i18n/translations';

interface Favorite {
  label: string;
  href: string;
}

interface PersonalContent {
  heading: string;
  intro: string;
  linksLabel: string;
  favorites: Favorite[];
}

const QUOTE = 'https://www.azquotes.com/quote/588429';
const MOVIE = 'https://www.imdb.com/title/tt27503384/';
const PODCAST = 'https://lexfridman.com/podcast';
const ALBUM = 'https://open.spotify.com/album/4GGazqHvuKwxBjWLFaJkDL';

export const PERSONAL: Record<Language, PersonalContent> = {
  en: {
    heading: 'Personal',
    intro:
      "Away from the keyboard you'll find me running, cycling, swimming, " +
      "skiing, or out on a via ferrata. I like traveling too and have visited " +
      '41 countries across the world.',
    linksLabel: 'Some links to check out:',
    favorites: [
      { label: 'Favorite Quote', href: QUOTE },
      { label: 'Favorite Podcast', href: PODCAST },
      { label: 'Favorite Album', href: ALBUM },
      { label: 'Favorite Movie', href: MOVIE },
    ],
  },
  fr: {
    heading: 'Personnel',
    intro:
      'Mes hobbies sont la course, le cyclisme, la natation, le ski et les ' +
      "via ferrata. J'aime aussi voyager et j'ai déjà visité 41 pays à " +
      'travers le monde.',
    linksLabel: 'Quelques liens à parcourir:',
    favorites: [
      { label: 'Citation favorite', href: QUOTE },
      { label: 'Podcast favori', href: PODCAST },
      { label: 'Album favori', href: ALBUM },
      { label: 'Film favori', href: MOVIE },
    ],
  },
};
