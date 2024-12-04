<script lang="ts">
    import type { Snippet } from "svelte";
    import { isBrowser } from "./utils.js";

    type Props = {
        tagName: string;
        children?: Snippet;
        generateSass: (props: Record<string, any>) => string;
    } & Record<string, any>;

    let { tagName, children, generateSass, ...restProps }: Props = $props();
</script>

<svelte:head>
    <!--
    <svelte:element this={"style"}>
        {@html generateSass(restProps)}
    </svelte:element>
    -->
    {#if isBrowser()}
        <svelte:element this={"style"}>
            {@html generateSass(restProps)}
        </svelte:element>
    {:else}
        {@html `<style>${generateSass(restProps)}</style>`}
    {/if}
</svelte:head>

<svelte:element this={tagName} {...restProps}>
    {@render children?.()}
</svelte:element>
