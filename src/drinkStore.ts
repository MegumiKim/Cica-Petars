import { writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { DrinkType } from './types';

export const SingleDrink = writable<DrinkType>();

// // Store for the fetched drinks
export const allDrinks = writable<DrinkType[]>([]);

// Store for managing filter options
export const filterOptions = writable({
	category: 'Ordinary_Drink',
	ingredient: ''
});

export const UserFilter = writable<string>('Alphabetical Order');

// export const SavedDrinks = writable<DrinkType[]>([]);

// export const SavedStore: [] = writable((browser && localStorage.getItem('savedDrink')) || []);
export const SavedDrinkStore = localStorageStore('savedDrink', []);
