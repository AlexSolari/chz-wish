<script lang="ts">
    import type { CardData } from '$lib/types';
    import Button from './Button.svelte';
    import { book, unbook } from '$lib/remote/data.remote';

    interface Props {
        item: CardData;
    }

    let { item }: Props = $props();

    async function handleBooking() {
        const secret = prompt(
            'Придумайте пароль (він потрібен буде для відміни бронювання):'
        );

        if (secret) {
            item = await book({ name: item.name, secret });
        }
    }

    async function handleUnbooking() {
        const secret = prompt('Введіть пароль:');

        if (secret) {
            item = await unbook({ name: item.name, secret });
        }
    }
    const bookedText = $derived(item.isBooked ? 'Заброньовано' : 'Доступно');
    const buttonText = $derived(
        item.isBooked ? 'Прибрати бронь' : 'Забронювати'
    );
    const bookedClass = $derived(
        item.isBooked ? 'text-red-600' : 'text-green-600'
    );
    const actionClass = $derived(
        item.isBooked ? 'opacity-50 hover:opacity 100' : ''
    );
    const actionHandler = $derived(
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
        <h3 class="tracking-tight text-lg font-bold min-h-14">{item.name}</h3>
        <p class="text-sm text-gray-500">
            {@html item.description}
        </p>
    </div>
    <div>
        {#if item.link}
            <div class="pl-4 flex-grow">
                <p class="text-sm text-gray-600 underline">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item.link}>Купити тут</a
                    >
                </p>
            </div>
        {/if}

        <div class="m-2 flex items-center min-h-9">
            {#if item.isUnlimited}
                <span class="ml-2 mb-1 text-sm text-gray-500"
                    >Це можна дарувати в любому обсязі</span
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
</div>
