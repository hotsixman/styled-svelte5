<script lang="ts">
    import { styled } from "$lib/styled.js";

    let color = $state("red");
    const RedDiv = styled<{color: string}>('div', ({color}) => `color: ${color};`);
</script>

<input type="text" bind:value={color}>
<RedDiv {color}>
    ㅎㅇ
</RedDiv>
<RedDiv {color}>
    ㅎㅇ
</RedDiv>