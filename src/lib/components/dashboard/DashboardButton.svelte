<a href="{link}" on:click={onClick} download="{fileName}" class:minimal-width="{minimalWidth}">{content}</a>


<script lang="ts">

    export let link: string
    export let content: string
    export let minimalWidth: boolean = false
    export let onClick: any = undefined
    export let fileName: Optional<string> = undefined

</script>


<style>

    a {
        width: 100%;
        padding: 12px 20px;
        margin-bottom: 8px;

        display: flex;
        justify-content: center;
        align-content: center;

        font-weight: 700;
        color: black;
        background-color: white;

        transition: 300ms;
    }

    a:hover {
        transform: translate(-6px, -6px);
        box-shadow: 6px 6px 0 -3px black, 6px 6px white;
    }

    .minimal-width {
        width: auto;
    }

</style>
