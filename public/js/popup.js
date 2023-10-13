
function new_popup(text, popup_type) {
    let popup = document.getElementsByClassName("popup")[0];

    if (popup != undefined) { popup.remove(); }

    document.body.insertAdjacentHTML("beforeEnd",`
        <div class="popup ${popup_type}">
            <p class=popup-title>${popup_type.toUpperCase()}</p>
            <span class="close">&times;</span>
            <p>${text}</p>
        </div>`);

    popup = document.getElementsByClassName("popup")[0];
    let close = document.getElementsByClassName("close")[0];
    
    close.onclick = () => delete_popup(popup);
    setTimeout(() => {
        delete_popup(popup);
    }, 3500);
}

function delete_popup(popup) {
    popup.style.animation = "popup-hide 0.6s ease forwards";
    setTimeout(() => {
        popup.remove();
    }, 600);
}