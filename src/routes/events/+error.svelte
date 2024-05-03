<NavBar />

<div class="error-container">
    <h1>404</h1>
    <p>Dieser Event existiert leider (nicht) mehr</p>
    <button class="default-button" on:click={() => document.location.href = '/events'}>Eventübersicht</button>
</div>



<div class="footer-wrapper">
    <Footer />
</div>


<script>
    import NavBar from '$lib/components/NavBar.svelte'
    import Footer from '$lib/components/Footer.svelte'
</script>


<style>

    .error-container {
        width: 90%;
        margin: 0 auto;
        text-align: center;
    }

    .footer-wrapper {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .default-button {
        font-family: "Inter", "Helvetica Neue", "Helvetica", sans-serif;
        padding: 8px 12px;
        margin-top: 8px;
    }

</style>
