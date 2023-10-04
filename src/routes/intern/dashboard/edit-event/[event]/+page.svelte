
<OstEventForm initialOstEvent="{data.ostEvent}" on:eventSave={(e) => handleEventSave(e.detail)} />

<script lang="ts">

    import OstEventForm from "$lib/components/dashboard/OstEventForm.svelte";
    import {redirect} from "@sveltejs/kit";

    export let data

    async function handleEventSave(newOstEvent: OstEvent) {
        const completeOstEvent = newOstEvent
        completeOstEvent.organiserId = data.organisation._id
        completeOstEvent.organiser = data.organisation.name
        completeOstEvent.entranceFee = completeOstEvent.entranceFee === 0 ? undefined : completeOstEvent.entranceFee

        await sendRequest(completeOstEvent)
    }

    async function sendRequest(ostEvent: OstEvent) {
        const request = await fetch(`/api/events/${data.ostEvent?._id}`, {
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
