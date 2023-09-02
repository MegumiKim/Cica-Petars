import { writable } from 'svelte/store';
import { browser } from '$app/environment';
export const SavedStore = writable((browser && localStorage.getItem('savedDrink')) || '');
savedStore.subscribe((val) => browser && (localStorage.savedDrink = val));
// export const localStore = (key, initial) => {
// 	const persist = localStorage.getItem(key);
// 	const data = persist ? JSON.parse(persist) : initial;
// 	console.log(data);

// 	const store = writable(data, () => {
// 		const unsubscribe = store.subscribe((value) => {
// 			localStorage.setItem(key, JSON.stringify(value));
// 		});
// 		return unsubscribe;
// 	});
// 	return store;
// };
