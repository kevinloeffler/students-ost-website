<div class="wrapper">
    <div class="column">
        <div class="profile-image-wrapper">
            <label for="new-logo">Logo:</label>
            {#if !showLogoUpload}
                <div class="logo-container">
                    <img src="{data.organisation.logo}" alt="Vereinslogo">
                </div>
                <button on:click={deleteLogo}>Entfernen</button>
            {/if}
            {#if showLogoUpload}
                <input type="file" id="new-logo" on:change={handleImageUpdate}>
            {/if}
        </div>

        <label for="name">Name:</label>
        <input type="text" id="name" bind:value={newOrganisation.name}>

        <label for="website">Website</label>
        <input type="text" id="website" bind:value={newOrganisation.website}>

        <label for="email">Email:</label>
        <input type="text" id="email" bind:value={newOrganisation.email}>
    </div>

    <div class="column">
        <label for="description">Beschreibung:</label>
        <textarea bind:value={newOrganisation.description}></textarea>

        <div class="button-row">
            <a href="/intern/dashboard" class="dashboard-button-secondary">Abbrechen</a>
            <button class="dashboard-button" on:click={updateOrganisation}>Speichern</button>
        </div>
    </div>
</div>


<script lang="ts">

    export let data

    let newOrganisation: Organisation = data.organisation
    let showLogoUpload = !newOrganisation.logo

    async function updateOrganisation() {
        const request = await fetch('/api/organisation', {
            method: 'POST',
            body: JSON.stringify(newOrganisation),
            headers: {'Content-Type': 'application/json'}
        })
        const response = await request.json()
        if (response.status) {
            document.location.href = '/intern/dashboard'
        } else {
            // TODO: handle error case where the update failed
            console.error('error when updating organisation:', response.statusText)
        }
    }

    async function handleImageUpdate(event: any) {
        const file = event?.target?.files[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)
        formData.append('dir', 'logos')

        try {
            const response = await fetch('/api/upload', { method: 'POST', body: formData })
            if (response.ok) {
                const result = await response.json()
                newOrganisation.logo = result.url
            } else {
                console.error('Error uploading file:', response.statusText)
            }
        } catch (error) {
            console.error('Error uploading file:', error)
        }
    }

    async function deleteLogo() {
        try {
            const response = await fetch('/api/upload', {
                method: 'DELETE',
                body: JSON.stringify({path: newOrganisation.logo})
            })
            if (response.ok) {
                newOrganisation.logo = ''
                showLogoUpload = true
            }
        } catch (err) {
            console.error(err)
        }

    }

</script>


<style>

    .wrapper {
        display: flex;
        justify-content: space-between;
    }

    .column {
        display: flex;
        flex-direction: column;
        width: 48%;
    }

    label {
        display: block;
        font-weight: bold;
        margin-top: 20px;
    }

    input, textarea {
        border: 2px solid var(--admin-gray);
        color: white;
        background-color: black;

        width: 100%;
        padding: 12px 16px;

        font-size: 18px;
    }

    input::placeholder, textarea::placeholder {
        color: var(--admin-gray);
    }

    textarea {
        flex-grow: 1;
        resize: vertical;
    }

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

    .button-row {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .dashboard-button {
        width: 100%;
        margin-left: 20px;
    }

</style>

