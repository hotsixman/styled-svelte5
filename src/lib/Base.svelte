<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        tagName: string;
        children?: Snippet;
        generateSass: (props?: Record<string, any>) => string;
    } & Record<string, any>;

    let { tagName, children, generateSass, ...restProps }: Props = $props();
</script>

<svelte:head>
    <svelte:element this={"style"}>
        {generateSass(restProps)}
    </svelte:element>
</svelte:head>

<svelte:element this={tagName} {...restProps}>
    {@render children?.()}
</svelte:element>
