<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import SearchForm from '../components/SearchForm.svelte';
	import { storePopup } from '@skeletonlabs/skeleton';
	import logo from '$lib/logo.svg';
	import Icon from '@iconify/svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	let isMenuVisible = false;

	// Toggle Nav Menu 
	const toggleMenuOpen = () => {
		isMenuVisible = !isMenuVisible;
	};

// let currentPage = window.location.pathname;

</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<a href="/" class="uppercase max-w-[60px] hover:rotate-12 rounded-lg p-1"
					><img src={logo} alt="logo" class="max-w-full" /></a
				>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="flex gap-3 align-middle">
					<SearchForm />
					<button on:click={toggleMenuOpen}>
						<Icon icon="jam:menu" class="block text-3xl sm:hidden " />
					</button>
					<div class="relative justify-end align-middle m-auto">
						<div
							class="{isMenuVisible
								? 'block'
								: 'hidden'} text-right absolute top-12 right-0 p-3 rounded sm:static sm:flex sm:py-0 m-auto sm:order-2 sm:bg-transparent bg-purple-950 bg-opacity-90 "
						>
						<a href="/list/" class="font-bold px-5 py-2  my-3 block hover:variant-outline-primary"
						>Categories</a
						>
						<a
						href="/ingredients/"
						class="font-bold px-5 py-2 my-3 block hover:variant-outline-primary">Ingredients</a
						>
						<a
							href="/saved-drinks/"
							class="font-bold px-5 py-2 my-3 block hover:variant-outline-primary">Saved</a
						>
						</div>
					</div>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
