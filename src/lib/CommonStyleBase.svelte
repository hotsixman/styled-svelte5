<script lang="ts">
    import { isBrowser } from "./utils.js";

    interface Props {
        generateCommonSass: (props: Record<string, any>) => string;
    }

    let { generateCommonSass, ...restProps }: Props = $props();
</script>

<svelte:head>
    <!--
    <svelte:element this={"style"}>
        {@html generateSass(restProps)}
    </svelte:element>
    -->
    {#if isBrowser()}
        {@html `<style>${generateCommonSass(restProps)}</style>`}
    {:else}
        {@html `<style>${generateCommonSass(restProps)}</style>`}
    {/if}
</svelte:head>
