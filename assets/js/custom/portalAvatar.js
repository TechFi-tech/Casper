var all = document.getElementsByClassName('gh-portal-avatar');

for(var i = 0; i < all.length; i++){
    var image = document.getElementsByClassName('gh-portal-avatar')[i].getElementsByTagName('img');
    image[0].setAttribute("src", "/cars/3_large_2.png");
}
