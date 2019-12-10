var windowHeight = document.body.clientHeight;
setTimeout(() => {
    if (document.body.clientHeight != windowHeight) {
        AOS.refresh();
    } else {
        windowHeight = document.body.clientHeight;
    }
}, 1000);
