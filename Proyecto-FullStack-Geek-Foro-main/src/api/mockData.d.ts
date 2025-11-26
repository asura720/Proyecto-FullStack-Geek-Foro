export interface MockItem {
  id: string;
  title: string;
  description?: string;
}

export function getAll(): MockItem[];
export function getById(id: string): MockItem | null;
export function createItem(data: Partial<MockItem>): MockItem;
export function updateItem(id: string, patch: Partial<MockItem>): MockItem | null;
export function deleteItem(id: string): void;
