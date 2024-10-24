<script lang="ts">
	import type { ICardData } from "$lib/types";
	import Button from "./Button.svelte";
	import { post } from "$lib";

	interface Props {
		item: ICardData;
	}

	let { item }: Props = $props();

	async function handleBooking() {
		const secret = prompt(
			"Придумайте пароль (он нужен будет для отмены бронирования):"
		);

		if (secret) {
			const response = await post("/book", { name: item.name, secret });

			item = await response.json();
		}
	}

	async function handleUnbooking() {
		const secret = prompt("Введите пароль:");

		if (secret) {
			const response = await post("/unbook", { name: item.name, secret });

			item = await response.json();
		}
	}
	let bookedText = $derived(item.isBooked ? "Забронировано" : "Доступно");
	let buttonText = $derived(item.isBooked ? "Убрать бронь" : "Забронировать");
	let bookedClass = $derived(
		item.isBooked ? "text-red-600" : "text-green-600"
	);
	let actionClass = $derived(
		item.isBooked ? "opacity-50 hover:opacity 100" : ""
	);
	let actionHandler = $derived(
		item.isBooked ? handleUnbooking : handleBooking
	);
</script>

<div
	class="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col"
	data-v0-t="card"
>
	<img
		src={item.image}
		alt={item.name}
		width="500"
		height="400"
		class="object-contain w-full h-64 rounded-t-lg"
		style="aspect-ratio: 500 / 400;"
	/>
	<div class="p-4 flex-grow">
		<h3 class="tracking-tight text-lg font-bold">{item.name}</h3>
		<p class="text-sm text-gray-500">
			{@html item.description}
		</p>
	</div>
	{#if item.link}
		<div class="pl-4 flex-grow">
			<p class="text-sm text-gray-600 underline">
				<a target="_blank" rel="noopener noreferrer" href={item.link}
					>Купить можно тут</a
				>
			</p>
		</div>
	{/if}
	<div class="m-2 flex items-center">
		{#if item.isUnlimited}
			<span class="ml-2 mb-1 text-sm text-gray-500"
				>Это можете дарить в любом количестве</span
			>
		{:else}
			<div class="flex flex-1 self-end relative bottom-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="w-5 h-5 {bookedClass} flex-3"
					><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
					></path><circle cx="12" cy="7" r="4"></circle></svg
				>
				<span class="ml-2 text-sm {bookedClass}">{bookedText}</span>
			</div>
			<Button
				active={item.isBooked}
				handler={actionHandler}
				userClass={actionClass}>{buttonText}</Button
			>
		{/if}
	</div>
</div>
