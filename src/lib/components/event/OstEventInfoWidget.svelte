{#if content}
    <p class="label">{label}</p>
    <div class="content">
        {content}
    </div>
{/if}

<script lang="ts">

    export let label: string
    export let content: Optional<string>

</script>


<style>

    .label {
        color: #B0B0B0;
        font-size: 12px;
    }

    .content {
        border: 1.5px solid #B0B0B0;
        padding: 12px 16px;
        margin-bottom: 20px;
    }

</style>
