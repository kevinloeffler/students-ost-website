<a href="{link}">{content}</a>


<script lang="ts">

    export let link: string
    export let content: string

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
    }

</style>
