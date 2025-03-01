<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import Card from '$lib/components/Card.svelte';
    import { currentUser } from '$lib/stores.svelte.js';
    import type { ICardData } from '$lib/types';
    interface Props {
        data: { viewModels: ICardData[] };
    }

    let { data }: Props = $props();

    $effect(() => {
        document.cookie = `target=${currentUser.name}`;
        invalidateAll();
    });
</script>

<div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl"
>
    {#each data.viewModels as cardItem}
        <Card item={cardItem} />
    {:else}
        <p class="text-gray-500 col-span-3 text-center">Поки нічого!</p>
    {/each}
</div>

<style lang="postcss">
</style>
