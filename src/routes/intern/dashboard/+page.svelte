<div class="wrapper">

    <div class="events-wrapper">
        <h2>Events:</h2>
        <a href="/intern/dashboard/new-event" class="new-event-button">Neuen Event erstellen</a>
        {#each data.orgEvents as ostEvent}
            <DashboardEventThumbnail ostEvent="{ostEvent}" />
        {/each}

    </div>

    <div class="profile-wrapper">
        <h2>Profil:</h2>
        <DashboardButton link="/intern/dashboard/profile" content="Profil bearbeiten" onClick="{() => {console.log('clicked')}}" minimalWidth/>
    </div>
</div>



<script lang="ts">

    import DashboardButton from "$lib/components/dashboard/DashboardButton.svelte";
    import DashboardEventThumbnail from "$lib/components/dashboard/DashboardEventThumbnail.svelte";

    export let data

</script>


<style>

    .wrapper {
        display: flex;
        justify-content: space-between;
        max-width: 600px;
    }

    .events-wrapper {
        width: 100%;
        padding-right: 40px;
    }

    .profile-wrapper {
        width: 45%;
        max-width: 200px;
    }

    h2 {
        font-size: 20px;
        margin-bottom: 12px;
    }

    .new-event-button {
        display: block;
        width: 100%;

        font-size: 20px;
        font-weight: bold;

        padding: 40px 20px;
        margin-bottom: 16px;
        text-align: center;

        color: var(--admin-gray);
        background-color: transparent;
        border: 2px solid var(--admin-gray);

        transition-duration: 250ms;
    }

    .new-event-button:hover {
        color: white;
        background-color: var(--admin-gray);
    }

</style>

