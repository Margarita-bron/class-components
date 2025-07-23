const mockData = [
  {
    author_key: ['OL18053A'],
    author_name: ['Edith Nesbit'],
    first_publish_year: 1973,
    key: '/works/OL99529W',
    language: ['spa', 'fre', 'eng'],
    title: 'The Book of Dragons',
    description: 'dtyghujkhgtfdedrtgyhuj',
  },
  {
    author_key: ['OL1425869A'],
    author_name: ['Markus Zusak', 'ftgnjxfh'],
    first_publish_year: 1998,
    key: '/works/OL5819456W',
    language: [
      'kor',
      'spa',
      'rum',
      'rus',
      'eng',
      'ger',
      'nor',
      'dan',
      'fre',
      'pol',
      'vie',
      'ice',
      'dut',
      'ita',
      'por',
      'chi',
    ],
    title: 'The Book Thief',
  },
  {
    author_key: ['OL24461A'],
    author_name: ['Rudyard Kipling'],
    first_publish_year: 1893,
    key: '/works/OL19870W',
    language: ['rus', 'ger', 'fre', 'eng', 'chi', 'ita', 'spa', 'urd'],
    title: 'The Jungle Book',
  },
  {
    author_key: ['OL840964A'],
    author_name: ['Okakura Kakuzo'],
    first_publish_year: 1900,
    key: '/works/OL7095112W',
    language: ['jpn', 'vie', 'chi', 'fre', 'ger', 'epo', 'spa', 'gre', 'eng'],
    title: 'The book of tea',
    description: 'dtyghujkhgtfdeegrdrtgyhuj',
  },
];

const mockDataWithDescription = [
  {
    key: '/works/OL99529W',
    title: 'The Book of Dragons',
    description: 'dtyghujkhgtfdedrtgyhuj',
  },
  {
    key: '/works/OL5819456W',
    title: 'The Book Thief',
    description: 'sdds',
  },
  {
    key: '/works/OL588819456W',
    title: 'The Book teas',
    description: 'dewsaecasew',
  },
  {
    key: '/works/OL19870W',
    title: 'The Jungle Book',
    description: 'edsfrgtujikujyrfedsrfgtyu7',
  },
];

const mockDataWithoutDescription = [
  {
    key: '/works/OL99529W',
    author_name: ['Markus Zusak', 'ftgnjxfh'],
    title: 'The Book of Dragons',
  },
  {
    key: '/works/OL5819456W',
    author_name: ['Markus Zusak', 'ftgnjxfh'],
    title: 'The Book Thief',
  },
  {
    key: '/works/OL19870W',
    author_name: ['Rudyard Kipling'],
    title: 'The Jungle Book',
  },
  {
    key: '/works/OL7095112W',
    author_name: ['Okakura Kakuzo'],
    title: 'The book of tea',
  },
];

export { mockData, mockDataWithDescription, mockDataWithoutDescription };
