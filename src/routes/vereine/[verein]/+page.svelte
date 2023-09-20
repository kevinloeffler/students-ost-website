<h1>{verein.name}</h1>
<p>{verein.description}</p>

{#if verein.email}
    email
{/if}

{#if verein.website}
    website
{/if}

<script lang="ts">

    export let data
    const verein: Verein = data.verein

</script>
