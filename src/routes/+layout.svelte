<script lang="ts">
    import { currentUser } from "$lib/stores";
    import { User } from "$lib/types";
    import "../app.css";

    const users = Object.values(User);
    let selectedUser = $currentUser;

    function changeUser() {
        currentUser.update((_) => selectedUser);
    }
</script>

<main
    class="flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8"
>
    <h1 class="text-2xl font-semibold mb-6 font-mono header">
        <a href="/">./wishlist/</a>
        <select
            class="text-gray-500"
            bind:value={selectedUser}
            on:change={changeUser}
        >
            {#each users as user}
                <option value={user}>{user}</option>
            {/each}
        </select>
    </h1>

    <slot />
</main>
