function getCatsBreedAndPhoto() {
  return fetch("https://api.thecatapi.com/v1/breeds")
    .then((res) => res.json())
    .then((data) =>
      data.filter((cat) => {
        if (cat.image) {
          return cat.image.url;
        }
      }),
    );
}

function makeGridContainer() {
  const div = document.createElement("div");
  div.classList.add("container");
  return div;
}

async function showCats() {
  const grid = makeGridContainer();
  const { body } = document;

  try {
    const cats = await getCatsBreedAndPhoto();
    // console.log(cats);
    cats.forEach((cat) => {
      const { id, image, name, origin } = cat;
      console.log(id, name, image, origin);
      const a = document.createElement("a");
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const div = document.createElement("div");
      const h2 = document.createElement("h2");
      const p = document.createElement("p");

      a.href = `#`;
      a.classList.add("cat-item");

      h2.classList.add("cat-item__breed");
      h2.textContent = name;

      p.classList.add("cat-item__origin");
      p.textContent = origin;

      div.classList.add("cat-item__header");
      div.append(h2);
      div.append(p);

      img.src = image.url;
      figure.classList.add("cat-item__thumbnail");
      figure.append(img);
      figure.append(div);

      a.append(figure);

      grid.append(a);
    });
  } catch (err) {
    console.log(err.message);
  }

  body.append(grid);
}

showCats();
