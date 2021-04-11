const photos = [
  {
    id: 0,
    division: 0,
    src:
      "https://c.files.bbci.co.uk/41CF/production/_109474861_angrycat-index-getty3-3.jpg",
  },
  {
    id: 1,
    division: 0,
    src:
      "https://yourgzee.com/wp-content/uploads/2020/07/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145.jpg",
  },
  {
    id: 2,
    division: 0,
    src: "https://www.catslove.com/media/slider/20201130_CL_SLIDER_FILETS.jpg",
  },
  {
    id: 3,
    division: 0,
    src:
      "https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop",
  },
  {
    id: 4,
    division: 0,
    src:
      "https://cdnuploads.aa.com.tr/uploads/Contents/2021/03/09/thumbs_b_c_4e44cacd94ed1ca3159ab2cf1af91a86.jpg?v=025546",
  },
  {
    id: 5,
    division: 0,
    src:
      "https://www.rnd.de/resizer/NcM5q2VHQM650M9-_gcdUAa8gDM=/1441x811/arc-anglerfish-eu-central-1-prod-madsack.s3.amazonaws.com/public/IA53UWN3UFFMNAIOBBG2SBIVKA.jpeg",
  },
  {
    id: 6,
    division: 1,
    src:
      "https://i.natgeofe.com/n/6f9b6d9e-5797-4867-a859-7b0c2a66cd3b/02-bird-of-paradise-A012_C010_1029SF_0001575.jpg?w=636&h=424",
  },
  {
    id: 7,
    division: 1,
    src:
      "https://www.birdlife.org/sites/default/files/styles/1600/public/news/green_peafowl_c_roger_smith_flickr_smaller_1_cropped.jpg?itok=3LId7GL6",
  },
  {
    id: 8,
    division: 1,
    src: "https://storge.pic2.me/c/1360x800/615/5791d8ed315de.jpg",
  },
  {
    id: 9,
    division: 1,
    src: "https://i.ytimg.com/vi/KIYkpwyKEhY/maxresdefault.jpg",
  },
  {
    id: 10,
    division: 1,
    src:
      "https://image.fhserv.ru/hunting/2014-10-15e25987d154c9aa6e862d90c0a1599c__rsu-1000-800.jpg?hash=b291290d",
  },
  {
    id: 11,
    division: 1,
    src:
      "https://i.pinimg.com/originals/82/a3/cb/82a3cb6c8164e89ddb176deebc431685.jpg",
  },
];
const catalogue = [
  { id: -1, name: "All" },
  { id: 0, name: "Cats" },
  { id: 1, name: "Birds" },
];

const main = () => {
  const select = document.querySelector("#catalog");
  renderImages(0);
  catalogue.forEach((animal) => {
    const option = document.createElement("option");
    option.innerText = animal.name;
    option.value = "animal_" + animal.id;
    select.appendChild(option);
  });
  document.querySelector("#form").addEventListener("change", (event) => {
    event.preventDefault();
    const division = +select.value.split("_")[1];
    chooseCategory(
      division,
      division === -1
        ? 0
        : photos.filter((animal) => {
            return animal.division === division;
          })[0].id
    );
  });
};
const chooseCategory = (division, id = 0) => {
  if (division === -1) {
    renderImages(photos.findIndex((item) => item.id === id));
  } else {
    const photo = photos.filter((animal) => animal.division === division);
    renderImages(
      photo.findIndex((item) => item.id === id),
      division,
      photo
    );
  }
};
const renderImages = (index, division = -1, photo = photos) => {
  const divs = document.querySelectorAll("#s-left,#s-center,#s-right");
  let i = -1;
  for (divSmall of divs) {
    const div = document.createElement("div");
    let j = chooseIndex(index + i, photo.length);
    div.style.backgroundImage = `url(${photo[j].src})`;
    div.classList = "general";
    div.id = "animal_" + photo[j].id + "_" + division;
    i++;
    divSmall.innerHTML = "";
    divSmall.appendChild(div);
    div.addEventListener("click", (event) => {
      let kId = +event.target.id.split("_")[1];
      let kDivision = +event.target.id.split("_")[2];
      chooseCategory(kDivision, kId);
    });
  }
  buttonsListener(index, division, photo);
  renderCenter(photo[index].id);
};
const buttonsListener = (index, division, photo) => {
  const buttons = document.querySelectorAll("#l-button, #r-button");
  let i = -1;
  for (button of buttons) {
    const div = document.createElement("div");
    if ((i === -1)) {
      div.innerHTML =`<span class="left-top"></span><span class="left-botton"></span>`
    } else {
      div.innerHTML =`<span class="right-top"></span><span class="right-botton"></span>`
    }
    div.classList="button"
    let j = chooseIndex(index + i, photo.length);
    div.id = "button_" + photo[j].id + "_" + division;
    button.innerHTML="";
    button.appendChild(div);
    // console.log(button);
    i += 2;
    div.addEventListener("click", (event) => {
      let kId = +event.currentTarget.id.split("_")[1];
      let kDivision = +event.currentTarget.id.split("_")[2];
      console.log(kId);
      chooseCategory(kDivision, kId);
      console.log(event.target);
    });
  }
};

const chooseIndex = (index, length) => {
  if (index < 0) {
    return length - 1;
  } else if (index === length) {
    return 0;
  } else {
    return index;
  }
};
const renderCenter = (id) => {
  const photo = photos.filter((animal) => animal.id === id)[0];
  const div = document.createElement("div");
  div.style.backgroundImage = `url(${photo.src})`;
  const divCenter = document.querySelector("#center");
  divCenter.innerHTML = "";
  divCenter.appendChild(div);
};
main();
