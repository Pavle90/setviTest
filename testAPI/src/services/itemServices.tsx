import {Item} from '../types/ItemTypes'

export const fetchItems = async (): Promise<Item[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Error fetching items');
    }
    return response.json()as Promise<Item[]>;
  };

 export const fetchItem = async (id: number): Promise<Item> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      throw new Error('Error fetching item');
    }
    return response.json() as  Promise<Item>;
  };
  
  export const updateItem = async ({ id, title, body, userId }: Item): Promise<Item> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        title,
        body,
        userId,
      }),
    });
    if (!response.ok) {
      throw new Error('Error updating item');
    }
    return response.json() as Promise<Item>;
  };
  
 export const deleteItem = async (id: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting item');
    }
  };

  export const createItem = async ({ title, body, userId }: { title: string; body: string; userId:number }): Promise<Item> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        userId
      }),
    });
    if (!response.ok) {
      throw new Error('Error creating item');
    }
    return response.json() as  Promise<Item>;
  };