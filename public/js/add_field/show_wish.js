var wp = 1;
var wp_total = 1;

function refreashWishData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/wishlist.php?page=" + (wp - 1), true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            rawJSON = JSON.parse(xhr.responseText);            
            wp_total = Math.ceil(rawJSON.wishCount / 5);
            data = rawJSON.wishlist;

            for (var i = 0; i < 5; i++) {
                if (data[i] == undefined) {
                    document.getElementById('offer-' + i).style.background = "lightgrey";
                    // cacher les enfants
                    card = document.getElementById('offer-' + i);
                    card.children[0].children[0].innerHTML = ".";
                    card.children[1].innerHTML = "";
                    card.children[2].innerHTML = "";
                    card.children[3].innerHTML = "";
                }
                else {
                    document.getElementById('offer-' + i).style.background = "white";
                    card = document.getElementById('offer-' + i);
                    card.children[0].children[0].innerHTML = data[i].title;
                    card.children[1].innerHTML = data[i].companyName;
                    card.children[2].innerHTML = data[i].contactEmail;
                    card.children[3].innerHTML = data[i].applyDate;
                }
            }

            document.getElementById("nb-page").innerHTML = "Page " + wp + " / " + wp_total;
        }
        else {
            html = "<p>Erreur " + xhr.status + " : " + xhr.statusText + "</p>";
        }
    };
    xhr.send();
};

function changeWishPage(move) {
    wp += move;
    wp < 1 ? wp = wp_total : wp > wp_total ? wp = 1 : wp;
    refreashWishData();
};

refreashWishData();