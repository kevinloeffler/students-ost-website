<a href="{link}" download="{downloadable}">{content}</a>


<script lang="ts">

    export let link: string
    export let content: string
    export let downloadable: boolean = false

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
        color: white;
        background-color: var(--accent-color);

        transition: 300ms;
    }

    a:hover {
        transform: translate(-6px, -6px);
        box-shadow: 6px 6px 0 -3px white, 6px 6px var(--accent-color);
    }

</style>
