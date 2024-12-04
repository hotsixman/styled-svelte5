<script lang="ts">
    import { browser } from "$app/environment";

    interface Props {
        generateCommonSass: (props: Record<string, any>) => string;
    }

    let { generateCommonSass, ...restProps }: Props = $props();
</script>

<svelte:head>
    {#if browser}
        <svelte:element this={"style"}>
            {@html generateCommonSass(restProps)}
        </svelte:element>
    {:else}
        {@html `<style>${generateCommonSass(restProps)}</style>`}
    {/if}
</svelte:head>
