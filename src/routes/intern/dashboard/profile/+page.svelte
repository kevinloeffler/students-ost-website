<div class="wrapper">
    <div>
        <!-- TODO: change layout and make form work -->
        <form class="profile-image-wrapper" method="POST">

            <label for="profile-image">Logo:</label>
            <div class="logo-container">
                <img src="{data.organisation.logo}" alt="Vereinslogo">
            </div>
            <button on:click={() => alert('Funktioniert leider noch nicht 😔 Melde dich bitte per email: students-rj@ost.ch')}>Bearbeiten</button>
            {#if showLogoUpload}
                <input type="file">
            {/if}

            <label for="name">Name:</label>
            <input type="text" id="name" bind:value={newOrganisation.name}>

            <label for="website">Website</label>
            <input type="text" id="website" bind:value={newOrganisation.website}>

            <label for="email">Email:</label>
            <input type="text" id="email" bind:value={newOrganisation.email}>

            <label for="description">Beschreibung:</label>
            <textarea bind:value={newOrganisation.description}></textarea>

            <DashboardButton link="" content="Abbrechen" />
            <DashboardButton link="/intern/dashboard" content="Abbrechen" />

        </form>

    </div>
</div>


<script lang="ts">

    import DashboardButton from "$lib/components/dashboard/DashboardButton.svelte";

    export let data

    let showLogoUpload = false

    let newOrganisation: Organisation = data.organisation

</script>


<style>

    .profile-image-wrapper {
        width: 140px;
    }

    .profile-image-wrapper > button {
        width: 100%;
        color: var(--admin-gray);
        background-color: transparent;
        border: none;
        margin-top: 8px;
        cursor: pointer;
        transition-duration: 250ms;
    }

    .profile-image-wrapper > button:hover {
        color: white;
    }

    .logo-container {
        width: 140px;
        height: 140px;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: white;
        border-radius: 100%;

        overflow: hidden;
    }

    .logo-container > img {
        width: 55%;
    }

</style>

