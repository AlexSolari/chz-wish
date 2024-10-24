<script lang="ts">
    import { currentUser } from '$lib/stores.svelte';
    import { User } from '$lib/types';
    import type { Snippet } from 'svelte';
    import '../app.css';
    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();

    const users = Object.values(User);

    $effect(() => {
        localStorage.content = currentUser.name;
    });

    function changeUser(event: Event) {
        currentUser.name = (event.target as any).value;
    }
</script>

<div
    class="flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8"
>
    <h1 class="text-2xl font-semibold mb-6 font-mono header">
        <a href="/">./wishlist/</a>
        <select class="text-gray-500" onchange={changeUser}>
            {#each users as user}
                <option value={user}>{user}</option>
            {/each}
        </select>
    </h1>
    <div>{@render children()}</div>
</div>
