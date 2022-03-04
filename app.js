async function getCatsBreedAndPhoto() {
  const response = await fetch("https://api.thecatapi.com/v1/breeds");
  const data = await response.json();
  return data.filter((cat) => cat.image).map((cat) => [cat.id, cat.image.url]);
}

function makeGridContainer() {
  const div = document.createElement("div");
  div.classList.add("container");
  return div;
}

function el(element) {
  return document.createElement(element);
}

async function showCats() {
  const grid = makeGridContainer();
  const { body } = document;

  try {
    const cats = await getCatsBreedAndPhoto();
    cats.forEach((cat) => {
      const [cat_name, cat_image] = cat;
      const a = el("a");
      const figure = el("figure");
      const img = el("img");
      const div = el("div");
      const h2 = el("h2");
      const p = el("p");

      a.href = `#`;
      a.classList.add("cat-item");

      div.classList.add("cat-item__header");
      h2.textContent = cat_name;
      div.append(h2);
      div.append(p);

      img.src = cat_image;
      figure.classList.add("cat-item__thumbnail");
      figure.append(img);
      figure.append(div);

      a.append(figure);

      grid.append(a);
    });
  } catch (err) {
    throw Error(err.message);
  }
  body.append(grid);
}

showCats();
