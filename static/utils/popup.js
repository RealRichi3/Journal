// Display popUp box
function popUp(iconPath, textContent, closeOverlay) {
    const [popUpBox, popUpIcon, popUpMsg] = [
        document.getElementsByClassName("finalMsg")[0],
        document.getElementsByClassName("msgIcon")[0],
        document.getElementById("popUpMsg")
    ];

    popUpBox.style.visibility = "visible";
    popUpIcon.setAttribute("src", `${iconPath}`);
    popUpMsg.innerHTML = textContent;

    setTimeout(
        (close) => {
            popUpBox.style.visibility = "hidden";
            if (close) {
                createAccForm.style.visibility = "hidden";
            }
        },
        3000,
        closeOverlay
    );
}

// export { popUp };
