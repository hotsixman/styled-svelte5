<script lang="ts">
    import { isBrowser } from "./utils.js";

    interface Props {
        generateCommonSass: (props: Record<string, any>) => string;
    }

    let { generateCommonSass, ...restProps }: Props = $props();
</script>

<svelte:head>
    {#if isBrowser()}
        <svelte:element this={"style"}>
            {@html generateCommonSass(restProps)}
        </svelte:element>
    {:else}
        {@html `<style>${generateCommonSass(restProps)}</style>`}
    {/if}
</svelte:head>
