<script lang="ts">
	import type { Snippet } from "svelte";

  interface Props{
    active: Boolean,
    handler: () => void,
    userClass: String,
    children: Snippet
  }

  let {
    active = true,
    handler = () => {},
    userClass = "",
    children
  }: Props = $props();

  let additionalClasses = !active
    ? "border border-gray-400 text-gray-800"
    : "text-gray-500";
</script>

<button
  onclick={handler}
  class="bg-white hover:bg-gray-100 font-semibold py-2 px-4 {additionalClasses} text-sm rounded shadow ml-2 relative {userClass}"
  >{@render children?.()}</button
>
