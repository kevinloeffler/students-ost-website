<h1>Vereine</h1>

{#each data.vereine as verein}
    <a href="/vereine/{encodeURI(verein.name)}">{verein.name}</a> <br>
{/each}


<script lang="ts">

    export let data;

</script>
