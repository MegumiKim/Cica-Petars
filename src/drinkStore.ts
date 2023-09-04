import { writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { DrinkType } from './types';

export const SingleDrink = writable<DrinkType>();

// // Store for the fetched drinks
export const allDrinks = writable<DrinkType[]>([]);

export const UserFilter = writable<string>('Ordinary Drink');

export const SavedDrinkStore = localStorageStore('savedDrink', []);

export const CurrentPathStore = writable<string>('/');
// export const pageStore = writable();
