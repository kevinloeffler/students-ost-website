<NavBar />

<HomeHeader ostEvents="{data.ostEvents}"/>
<LinksSection />
<StudentsSection />
<Footer />

<script>
    import Footer from '$lib/components/Footer.svelte'
    import NavBar from '$lib/components/NavBar.svelte'
    import WipWarning from '$lib/components/WipWarning.svelte'
    import HomeHeader from './HeaderSection.svelte'
    import LinksSection from './LinksSection.svelte'
    import StudentsSection from './StudentsSection.svelte'

    export let data

</script>
