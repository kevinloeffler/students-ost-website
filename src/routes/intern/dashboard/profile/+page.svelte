<div class="wrapper">
    <div class="column">
        <div class="profile-image-wrapper">
            <label for="new-logo">Logo:</label>
            {#if !showLogoUpload}
                <div class="logo-container">
                    <img src="{data.organisation.logo}" alt="Vereinslogo">
                </div>
                <button on:click={() => showLogoUpload = !showLogoUpload}>Entfernen</button>
            {/if}
            {#if showLogoUpload}
                <input type="file" id="new-logo" bind:this={fileInput} bind:value={file}>
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

    let showLogoUpload = false

    let newOrganisation: Organisation = data.organisation
    let fileInput: HTMLInputElement
    let file: any

    async function updateOrganisation() {
        const fileObject = await readFile()
        const request = await fetch('/api/organisation', {
            method: 'POST',
            body: JSON.stringify({organisation: newOrganisation, file: fileObject}),
            headers: {'Content-Type': 'application/json'}
        })
        const response = await request.json()
        if (response.status) {
            document.location.href = '/intern/dashboard'
        } else {
            // TODO: handle error case where the update failed
        }
    }

    async function readFile () {
        //@ts-ignore
        if (!fileInput || fileInput?.files.length === 0) return null

        //@ts-ignore
        const splitFileName = file.split('.')
        const fileSuffix = splitFileName[splitFileName.length - 1]

        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onerror = () => {
                reader.abort()
                reject(new DOMException("Problem parsing input file."))
            }

            reader.onload = () => {
                //@ts-ignore
                resolve({ data: new Uint8Array(reader.result), suffix: fileSuffix })
            }
            //@ts-ignore
            reader.readAsArrayBuffer(fileInput.files[0])
        })
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

