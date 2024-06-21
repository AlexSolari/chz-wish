<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import Card from "$lib/components/Card.svelte";
    import { currentUser } from "$lib/stores.js";
    import { onMount } from "svelte";
    export let data;

    onMount(() => {
        currentUser.subscribe((value) => {
            document.cookie = `target=${value}`;
            invalidateAll();
        });
    });
</script>

<div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl"
>
    {#each data.viewModels as cardItem}
        <Card item={cardItem} />
    {:else}
        <p class="text-gray-500 col-span-3 text-center">Пока что ничего!</p>
    {/each}
</div>

<style lang="postcss">
</style>
