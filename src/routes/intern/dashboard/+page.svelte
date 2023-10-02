<div>

    <h2>Events:</h2>
    {#each data.orgEvents as ostEvent}
        <p>{ostEvent.name}</p>
        <p>{ostEvent.date}</p>
    {/each}

    <h2>Profil:</h2>
    <DashboardButton link="/" content="Profil bearbeiten" onClick="{() => {console.log('clicked')}}" minimalWidth />

</div>



<script lang="ts">

    import DashboardButton from "$lib/components/dashboard/DashboardButton.svelte";

    export let data

</script>
