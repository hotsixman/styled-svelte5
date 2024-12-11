<script lang="ts">
    import { isBrowser } from "./utils.js";

    interface Props {
        generateCommonSass: (props: Record<string, any>) => string;
    }

    let { generateCommonSass, ...restProps }: Props = $props();
</script>

<svelte:head>
    {#if isBrowser()}
        {@html `<style>${generateCommonSass(restProps)}</style>`}
    {:else}
        {@html `<style>${generateCommonSass(restProps)}</style>`}
    {/if}
</svelte:head>
