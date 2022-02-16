var apple_store = document.getElementById("app-store");

if (window.matchMedia('(max-width: 560px)').matches) {
    //スマホ処理
    console.log(apple_store.id);
} else if (window.matchMedia('(min-width: 560px) and (max-width: 959px)').matches) {
    //PC処理
} else {

}