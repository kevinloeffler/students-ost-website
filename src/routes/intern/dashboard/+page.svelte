<h2>Verein</h2>
<p>{data.dashboard.org.name}</p>
<p>{data.dashboard.org.description}</p>

<h2>Events</h2>
{#each data.dashboard.orgEvents as ostEvent}
    <p>{ostEvent.name}</p>
    <p>{ostEvent.date}</p>
{/each}


<script lang="ts">

    export let data

</script>
