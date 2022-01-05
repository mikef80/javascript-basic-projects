const projects = [
    {
        id: 1,
        title: 'color flipper',
        img: './01-color-flipper/setup/screenshot.jpeg',
        url: './01-color-flipper/setup/index.html',
    },
    {
        id: 2,
        title: 'counter',
        img: './02-counter/setup/screenshot.jpeg',
        url: './01-counter/setup/index.html',
    }
];

const gallery = document.querySelector(".gallery");

window.addEventListener("DOMContentLoaded", function () {
  let displayMenu = projects.map(function (item) {
    // console.log(item);

    return `<article class="project">
                <a href=${item.url}>
                    <img src=${item.img} class="photo" alt=${item.title}>
                </a>
                <div class="project-info">
                <header>
                    <h4>${item.title}</h4>
                </header>
                <p class="item-text">${item.desc}</p>
                </div>
            </article>`;
  });
  displayMenu = displayMenu.join("");
  console.log(displayMenu);

  gallery.innerHTML = displayMenu;
});