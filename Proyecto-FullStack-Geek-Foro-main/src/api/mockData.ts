export interface MockItem {
  id: string;
  title: string;
  description?: string;
}

let mockData: MockItem[] = [
  { id: '1', title: 'Item 1', description: 'Descripción del item 1' },
  { id: '2', title: 'Item 2', description: 'Descripción del item 2' },
  { id: '3', title: 'Item 3', description: 'Descripción del item 3' }
];

export function getAll(): MockItem[] {
  return [...mockData];
}

export function getById(id: string): MockItem | null {
  return mockData.find(item => item.id === id) || null;
}

export function createItem(data: Omit<MockItem, 'id'>): MockItem {
  // Genera un id único usando Date.now y Math.random
  const newItem: MockItem = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    ...data
  };
  mockData.push(newItem);
  return newItem;
}

export function updateItem(id: string, data: Partial<Omit<MockItem, 'id'>>): MockItem | null {
  const index = mockData.findIndex(item => item.id === id);
  if (index === -1) return null;

  mockData[index] = { ...mockData[index], ...data };
  return mockData[index];
}

export function deleteItem(id: string): boolean {
  const index = mockData.findIndex(item => item.id === id);
  if (index === -1) return false;

  mockData.splice(index, 1);
  return true;
}
