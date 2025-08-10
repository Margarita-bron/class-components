import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { mockData } from '../../components/catalog/mocks/mockData';

export const server = setupServer(
  http.get('https://openlibrary.org/search.json', () => {
    return HttpResponse.json({ docs: mockData });
  }),
  http.get('https://openlibrary.org/:bookKey.json', (req) => {
    let { bookKey } = req.params;
    const key = Array.isArray(bookKey) ? bookKey[0] : (bookKey ?? '');

    if (!key) {
      return new Response(null, { status: 404 });
    }

    const found = mockData.find((book) => book.key.endsWith(key));

    if (found) {
      return HttpResponse.json(found);
    }

    return new Response(null, { status: 404 });
  })
);
