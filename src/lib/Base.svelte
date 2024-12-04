<script lang="ts">
    import { browser } from "$app/environment";
    import type { Snippet } from "svelte";

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
    {#if browser}
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
