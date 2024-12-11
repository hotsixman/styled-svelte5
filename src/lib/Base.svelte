<script lang="ts">
    import type { Snippet } from "svelte";
    import { isBrowser } from "./utils.js";
    import type { GenerateStyle } from "./types.js";

    type Props = {
        tagName: string;
        children?: Snippet;
        generateSass: GenerateStyle<Record<string, any>> | null;
    } & Record<string, any>;

    let { tagName, children, generateSass, ...restProps }: Props = $props();
</script>

<svelte:head>
    {#if generateSass}
        {#if isBrowser()}
            {@html `<style>${generateSass(restProps)}</style>`}
        {:else}
            {@html `<style>${generateSass(restProps)}</style>`}
        {/if}
    {/if}
</svelte:head>

<svelte:element this={tagName} {...restProps}>
    {@render children?.()}
</svelte:element>
