'use server';

import { SelectedBook } from '../../redux/slices/selected-books-slice';

export async function convertToCsv(
  selectedItems: SelectedBook[]
): Promise<string[]> {
  if (!selectedItems) return [''];
  const headers = ['id', 'name', 'description'];
  const structuredData = [
    headers.join(', '),
    ...selectedItems.map((item) =>
      headers
        .map((header) => {
          const val = item[header as keyof typeof item] ?? '';
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(',')
    ),
  ];
  return structuredData;
}
