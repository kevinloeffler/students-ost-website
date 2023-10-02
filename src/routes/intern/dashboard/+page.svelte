<h2>Verein</h2>
<p>{data.organisation?.name}</p>
<p>{data.organisation?.description}</p>

<h2>Events</h2>
{#each data.orgEvents as ostEvent}
    <p>{ostEvent.name}</p>
    <p>{ostEvent.date}</p>
{/each}


<script lang="ts">

    export let data

</script>
