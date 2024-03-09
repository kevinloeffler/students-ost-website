<div class="form">

    <div class="form-left">

        <label for="titel">Titel:</label>
        <input type="text" id="titel" bind:value={newOstEvent.name} placeholder="Name des Events">
        {#if showNameError}<p class="error-msg">Titel muss mindestens 3 Buchstaben lang sein</p>{/if}

        <label for="datum">Datum:</label>
        <input type="date" id="datum" value="{formatDateForInput(newOstEvent.date)}" on:change={ (e) => newOstEvent.date = new Date(e.target.value)}>

        <div class="form-row">
            <div>
                <label for="von">Von:</label>
                <input type="text" id="von" bind:value={newOstEvent.startTime} placeholder="18:00">
            </div>
            <div>
                <label for="bis">Bis:</label>
                <input type="text" id="bis" bind:value={newOstEvent.endTime} placeholder="22:00">
            </div>
        </div>

        <!-- can be implemented if needed
        <label for="students-only">Nur für Studierende:</label>
        <input type="checkbox" id="students-only" value="{initialOstEvent}">
        -->

        <label for="eintritt">Eintritt:</label>
        <input type="number" min="0" step="1" id="eintritt" bind:value="{newOstEvent.entranceFee}">
        <!--<p class="hint">Bei 0.- wird das Feld ausgeblendet</p>-->

        <label for="kontakt">Kontakt:</label>
        <input type="email" id="kontakt" bind:value="{newOstEvent.contactEmail}" placeholder="hallo@email.ch">

        <label for="tel">Tel:</label>
        <input type="tel" id="tel" bind:value="{newOstEvent.contactPhone}" placeholder="012 345 67 89">

        <label for="bild">Bild:</label>
        {#if newOstEvent.mainImage}
            <div class="image-exists-placeholder">
                <img src="{initialOstEvent?.mainImage}" alt="Titelbild des Event">
                <button on:click={deleteImage}>Bild löschen</button>
            </div>
        {:else}
            <input type="file" id="bild" bind:this={fileInput} bind:value={file}>
        {/if}
    </div>

    <div class="form-right">

        <label for="beschrieb">Beschrieb:</label>
        <textarea id="beschrieb" bind:value="{newOstEvent.description}" placeholder="Beschreibe den Event in ~5 Sätzen"></textarea>

        <div class="button-row">
            <a class="dashboard-button-secondary" href="/intern/dashboard">Abbrechen</a>
            <button class="dashboard-button" on:click={saveOstEvent}>Speichern</button>
        </div>

    </div>

</div>


<script lang="ts">

    import {createEventDispatcher} from "svelte";

    export let initialOstEvent: Optional<OstEvent> = undefined

    const dispatch = createEventDispatcher()
    $: dispatch('eventUpdate', newOstEvent)

    $: showNameError = newOstEvent.name.trim().length < 3

    // input file
    let file: any
    let fileInput: HTMLInputElement

    function deleteImage() {
        newOstEvent.mainImage = undefined
    }


    const newOstEvent: OstEvent = {
        _id: initialOstEvent?._id,
        name: initialOstEvent?.name || '',
        date: initialOstEvent?.date || new Date(),
        description: initialOstEvent?.description || '',
        startTime: initialOstEvent?.startTime,
        endTime: initialOstEvent?.endTime,
        entranceFee: initialOstEvent?.entranceFee || 0,
        organiser: initialOstEvent?.organiser,
        organiserId: initialOstEvent?.organiserId,
        contactEmail: initialOstEvent?.contactEmail,
        contactPhone: initialOstEvent?.contactPhone,
        link: initialOstEvent?.link,
        linkName: initialOstEvent?.linkName,
        mainImage: initialOstEvent?.mainImage,
    }

    function saveOstEvent() {
        // validate input
        console.log('saving ost event')
        if (showNameError) return
        console.log('file:', file)

        // load file
        if (fileInput?.files && fileInput?.files?.length > 0) {
            const reader = new FileReader();
            reader.onload = function() {
                const arrayBuffer = new Uint8Array(reader.result)

                const splitFileName = file.split('.')
                const fileSuffix = splitFileName[splitFileName.length - 1]
                const fileObject: FileObject = {data: arrayBuffer, suffix: fileSuffix}

                dispatch('eventSave', {ostEvent: newOstEvent, file: fileObject})
            }
            reader.readAsArrayBuffer(fileInput.files[0])

        } else {
            const mainImage = file || newOstEvent.mainImage
            dispatch('eventSave', {ostEvent: newOstEvent, file: mainImage})
        }
    }

    function formatDateForInput(dateString: string | Date): string {
        const date = new Date(dateString)
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    }

</script>


<style>

    .form {
        display: flex;
        align-items: stretch;
    }

    .form-left {
        width: 40%;
    }

    .form-right {
        width: 50%;
        margin-left: 48px;
    }

    .form-row {
        display: flex;
        justify-content: space-between;
    }

    .form-row > div {
        width: 45%;
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

    #beschrieb {
        height: 400px;
    }

    .hint {
        color: var(--admin-gray);
    }

    .error-msg {
        color: #ff5454;
    }

    .button-row {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .dashboard-button {
        width: 60%;
    }

    .dashboard-button-secondary {
        width: 35%;
        text-align: center;
    }

    .image-exists-placeholder {
        display: flex;
        border: 2px solid var(--admin-gray);
    }

    .image-exists-placeholder > img {
        height: 80px;
    }

    .image-exists-placeholder > button {
        margin-left: 20px;
        color: white;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

</style>
