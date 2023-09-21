<a href="/events/{encodeURI(ostEvent.name)}" class="wrapper" class:wrapper-vertical={isVertical} data-date="{new Date(ostEvent.date).getFullYear()}">

    <img class="thumbnail-image" src="{ostEvent.mainImage}" alt="Titelbild" bind:naturalWidth bind:naturalHeight>

    <div class="content-wrapper">
        <h3>{formatDateToString(ostEvent.date)}</h3>
        <h2>{ostEvent.name}</h2>
    </div>

</a>


<script lang="ts">

    export let ostEvent: OstEvent

    let naturalWidth: number
    let naturalHeight: number
    $: isVertical = naturalHeight > naturalWidth

    function formatDateToString(rawDate: string | Date): string {
        const date = new Date(rawDate)
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    }

</script>


<style>

    .wrapper {
        display: block;
        border: var(--default-border);
        color: var(--accent-color);
        font-family: "Radwave", sans-serif;
        line-height: 1;
        margin-bottom: 20px;
    }

    .content-wrapper {
        padding: 28px;
        border-top: var(--default-border);
    }

    .thumbnail-image {
        width: 100%;
        background-color: var(--accent-color);
        aspect-ratio: auto;
    }

    h2 {
        font-size: 24px;
    }

    h3 {
        font-size: 32px;
    }

    /* Vertical styles */

    @media (min-width: 601px) {

        .wrapper-vertical {
            display: flex;
        }

        .wrapper-vertical > .thumbnail-image {
            width: 60%;
        }

        .wrapper-vertical > .content-wrapper {
            border-left: var(--default-border);
            border-top: none;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .wrapper-vertical h3 {
            font-size: 24px;
        }

    }

    /* Mobile styles (text is always below image) */

    @media (max-width: 600px) {

        .content-wrapper {
            padding: 20px;
        }

        h2 {
            font-size: 16px;
        }

        h3 {
            font-size: 24px;
            padding-bottom: 4px;
        }

    }

</style>
