<script lang="ts">
    import type { Snippet } from 'svelte';
    import '../app.css';
    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();
</script>

<div
    class="flex flex-col items-center justify-center py-6 px-4 sm:px-6 lg:px-8"
>
    <h1 class="text-2xl font-semibold mb-6 font-mono header">
        ./chz/
        <span class="text-gray-500 blink">wishlist</span>
    </h1>
    <div>{@render children()}</div>
</div>
