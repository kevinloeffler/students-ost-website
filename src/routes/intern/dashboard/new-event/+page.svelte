
<OstEventForm initialOstEvent="{undefined}" on:eventSave={(e) => handleEventSave(e.detail)} />

<script lang="ts">

    import OstEventForm from "$lib/components/dashboard/OstEventForm.svelte";

    export let data

    async function handleEventSave(savedEvent: OstEvent) {
        const completeOstEvent = savedEvent
        completeOstEvent.organiserId = data.organisation._id
        completeOstEvent.organiser = data.organisation.name
        completeOstEvent.entranceFee = completeOstEvent.entranceFee === 0 ? undefined : completeOstEvent.entranceFee
        await sendRequest(completeOstEvent)
    }

    async function sendRequest(ostEvent: OstEvent) {
        const request = await fetch(`/api/events`, {
            method: 'POST',
            body: JSON.stringify(ostEvent),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await request.json()
        if (response.status) {
            document.location.href = '/intern/dashboard'
        }
        // TODO: handle case where the event could not be updated

    }

</script>
