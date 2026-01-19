<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import { getWishlistItems } from '$lib/remote/data.remote';
</script>

<div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl"
>
    {#each await getWishlistItems() as cardItem}
        <Card item={cardItem} />
    {:else}
        <p class="text-gray-500 col-span-3 text-center">Поки нічого!</p>
    {/each}
</div>

<style lang="postcss">
</style>
