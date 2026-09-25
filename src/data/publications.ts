// Edit this file to add, remove, or update publications — the Publications
// section on the site reads directly from the PUBLICATIONS array below.
//
// To add a paper: copy the object shape below into the array.
//   title:   full paper title
//   authors: e.g. "Nagarjun Gowda K N" or "Nagarjun Gowda K N, Jane Doe"
//   venue:   where it's published/submitted, e.g. "arXiv preprint" or "IEEE ICC 2027"
//   status:  'Published' | 'Accepted' | 'Under Review' | 'Preprint'
//   year:    e.g. "2026"
//   summary: one or two sentence description (optional)
//   url:     link to the paper (e.g. a Google Drive share link). Leave
//            undefined/omit it until the link is ready — the title will
//            render as plain text with a "Link coming soon" note instead
//            of a dead link.
//
// Example entry (delete the leading // on each line and fill in your own):
// {
//   title: 'Paper Title Goes Here',
//   authors: 'Nagarjun Gowda K N',
//   venue: 'arXiv preprint',
//   status: 'Under Review',
//   year: '2026',
//   summary: 'One or two sentences describing what the paper is about.',
//   url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view',
// },

export type PublicationStatus = 'Published' | 'Accepted' | 'Under Review' | 'Preprint';

export interface Publication {
  title: string;
  authors: string;
  venue?: string;
  status: PublicationStatus;
  year: string;
  summary?: string;
  url?: string;
}

export const PUBLICATIONS: Publication[] = [];
