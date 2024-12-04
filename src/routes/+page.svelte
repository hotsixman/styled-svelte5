<script lang="ts">
    import { styled } from "$lib/styled.js";

    let color = $state("red");
    let background = $state("blue");
    const RedDiv = styled<{color: string}, {background: string}>('div', ({color}) => `color: ${color};`, ({background}) => `background-color:${background}; &::before{content: '<'}`);
</script>

<input type="text" bind:value={color}>
<input type="text" bind:value={background}>
<RedDiv {color}>
    ㅎㅇ
</RedDiv>
<RedDiv color="red">
    ㅎㅇ
</RedDiv>
<RedDiv color="blue">
    ㅎㅇ
</RedDiv>
<RedDiv.common {background}/>