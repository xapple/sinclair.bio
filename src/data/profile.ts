// Single source of truth for canonical profile URLs and contact channels.
// Consumed by the home "Links" / contact cards (SOCIAL_LINKS, DM_CHANNELS),
// the portfolio callouts (PROFILES) and the JSON-LD schema builder (PROFILES),
// so each handle or URL is written exactly once.

// Canonical profile URLs. Reference these instead of pasting a literal URL.
export const PROFILES = {
  github:   'https://github.com/xapple',
  gitlab:   'https://gitlab.com/sinclair',
  linkedin: 'https://linkedin.com/in/sinclair-bio',
  orcid:    'https://orcid.org/0000-0003-4134-3571',
  scopus:   'https://www.scopus.com/authid/detail.uri?authorId=56675539100',
} as const;

// Public code / professional profiles shown in the home "Links" card.
// `icon` is a basename in src/assets/icons/; `label` is the display text.
export const SOCIAL_LINKS = [
  { icon: 'github',   label: 'github/xapple',   href: PROFILES.github },
  { icon: 'gitlab',   label: 'gitlab/sinclair', href: PROFILES.gitlab },
  { icon: 'linkedin', label: 'in/sinclair-bio', href: PROFILES.linkedin },
] as const;

// Peer-reviewed publications shown on the portfolio page. Language-invariant
// (titles, authors, journals, DOIs and years never translate), so they live
// here as one source rather than duplicated across content/portfolio/{en,fr}.json.
export const PUBLICATIONS = [
  {
    title: 'Comparing Reported Forest Biomass Gains and Losses in European and Global Datasets',
    href: 'https://doi.org/10.3390/f12020176',
    authors: 'Sinclair L., Rougieux P.',
    journal: 'Forests',
    year: '2021',
  },
  {
    title: 'Seqenv: linking sequences to environments through text mining',
    href: 'https://doi.org/10.7717/peerj.2690',
    authors: 'Sinclair L., Ijaz U.Z., Jensen L.J., et al.',
    journal: 'PeerJ',
    year: '2016',
  },
  {
    title: 'Microbial Community Composition and Diversity via 16S rRNA Gene Amplicons: Evaluating the Illumina Platform',
    href: 'https://doi.org/10.1371/journal.pone.0116955',
    authors: 'Sinclair L., Osman O.A., Bertilsson S., Eiler A.',
    journal: 'PLOS One',
    year: '2015',
  },
  {
    title: 'HTSstation: A Web Application and Open-Access Libraries for High-Throughput Sequencing Data Analysis',
    href: 'https://doi.org/10.1371/journal.pone.0085879',
    authors: 'David F.P.A., Delafontaine J., …, Sinclair L., et al.',
    journal: 'PLOS One',
    year: '2014',
  },
] as const;

// Direct-messaging channels shown in the home contact section.
export const DM_CHANNELS = [
  { icon: 'telegram', label: 'Telegram', handle: '@sinclair99',   href: 'https://t.me/sinclair99' },
  { icon: 'signal',   label: 'Signal',   handle: '@sinclair.99',  href: 'https://signal.me/#eu/R-vlT2way2bjfP_7a4OIQhF-kmpZYAB3M24x-b0ue15FoM4CvZNEjKD0qfCVNF5_' },
  { icon: 'threema',  label: 'Threema',  handle: '@p3wmfn9c',     href: 'https://threema.id/p3wmfn9c' },
  { icon: 'matrix',   label: 'Matrix',   handle: '@sinclair.bio', href: 'https://matrix.to/#/@sinclair.bio:matrix.org' },
] as const;
