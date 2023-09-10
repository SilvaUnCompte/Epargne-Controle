<div class="form-row wishlist">
    <div class="form-col">
        <label>Votre liste de souhaits : </label>
        </br></br>

        {for $i=0 to 4}
            <div class="offer-example" id="offer-{$i}">
                <p class="offer-title"><b>Title</b></p>
                <a class="offer-company" href='#'>Company</a>
                <!--Link to the company linked to the offer-->
                <a class="offer-company" href='mailto:'>Mail</a>
                <!--Link to the contact email of the offer-->
                <p class="offer-date">Date</p>
                <!--Time when bookmarked-->
            </div>
        {/for}

        <div class="pagination-div">
            <button id="previous-link" onclick="changeWishPage(-1)">&lt</button>
            <p id="nb-page"></p>
            <button id="next-link" onclick="changeWishPage(1)">&gt</button>
        </div>
    </div>
</div>

<script src="/public/js/add_field/show_wish.js"></script>