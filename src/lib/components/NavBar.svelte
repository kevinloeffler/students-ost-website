<div class="navbar default-section">
    <div class="navbar-container default-container">
        <a href="/">
            <img class="logo" src="/images/students-logo-blue.svg" alt="Das blaue logo der STUDENTS OST-RJ">
        </a>
        <Menu />
    </div>
</div>


<script>
    import Menu from './Menu.svelte'
</script>


<style>

    .navbar {
        position: sticky;
        top: 0;

        padding: 16px 20px;

        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);

        z-index: 100;
    }

    .navbar-container {
        display: flex;
        justify-content: space-between;
    }

    .logo {
        width: 70px;
    }

</style>
