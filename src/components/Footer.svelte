<section class="footer default-section">

    <div class="footer-container default-container">
        <div class="footer-wrapper">
            <div class="footer-column">
                <p class="footer-title">Students.OST-RJ</p>
                <p class="footer-item">Oberseestrasse 10</p>
                <p class="footer-item">8640 Rapperswil</p>
            </div>
            <div class="footer-column">
                <a class="footer-item" href="mailto:students-rj@ost.ch">students-rj@ost.ch</a>
                <a class="footer-item" href="https://instagram.com/students.ost_rj" target="_blank">@students-rj.ost</a>
            </div>
            <div class="footer-column">
                <a class="footer-item" href="https://ost.ch" target="_blank">Fachhochschule OST</a>
                <p class="footer-item">Students Shop</p> <!--TODO: add link to shop-->
            </div>
        </div>
    </div>

</section>

<style>

    .footer {
        color: white;
        background-color: var(--accent-color);
        margin-top: 80px;
        padding: 40px 0;
    }

    .footer-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        flex-wrap: wrap;

        max-width: 700px;
    }

    .footer-column {
        display: flex;
        flex-direction: column;
    }

    .footer-item {
        color: white;
        margin-right: 10px;
    }

    .footer-title {
        font-family: "Radwave", sans-serif;
    }

    /***** MOBILE *****/

    @media (max-width: 600px) {
        .footer-wrapper {
            flex-direction: column;
            align-items: start;
        }

        .footer-column {
            padding: 8px 0;
        }
    }

</style>
