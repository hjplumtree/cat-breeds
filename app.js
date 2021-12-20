function getCatsBreedAndPhoto() {
  return fetch("https://api.thecatapi.com/v1/breeds")
    .then((res) => res.json())
    .then((data) =>
      data.filter((cat) => cat.image).map((cat) => [cat.id, cat.image.url]),
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
    cats.forEach((cat) => {
      const [cat_breed, cat_photo] = cat;
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figure");
      img.src = cat_photo;
      figcaption.textContent = cat_breed;
      figure.append(img);
      figure.append(figcaption);

      grid.append(figure);
    });
  } catch (err) {
    console.log(err.message);
  }

  body.append(grid);
}

showCats();
