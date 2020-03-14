export interface Cart {
  order: Item[];
}

export interface Item {
  userId: string;
  id: string;
  title: string;
  body: string;
}
