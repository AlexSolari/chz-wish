<script lang="ts">
    import { get } from "$lib";
    import Card from "$lib/components/Card.svelte";
    import { currentUser } from "$lib/stores";
    import type { ICardData } from "$lib/types";
    import { onMount } from "svelte";

    let data = new Promise<ICardData[]>((_) => {});

    onMount(() =>
        currentUser.subscribe(async (_) => {
            const response = await get("/items");
            data = await response.json();
        }),
    );
</script>

{#await data}
    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl"
    >
        <p class="text-gray-500 col-span-3 text-center">загрузка...</p>
    </div>
{:then content}
    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl"
    >
        {#each content as cardItem}
            <Card item={cardItem} />
        {:else}
            <p class="text-gray-500 col-span-3 text-center">Пока что ничего!</p>
        {/each}
    </div>
{/await}

<style lang="postcss">
</style>
