const compareDuoImgs = {
  people: {
    withBg:
      'https://sb.kaleidousercontent.com/67418/992x558/ef4cc24685/people-org.png',
    withOutBg:
      'https://sb.kaleidousercontent.com/67418/992x558/7632960ff9/people.png',
  },
  product: {
    withBg:
      'https://sb.kaleidousercontent.com/67418/992x558/ccd910c34f/product-org.png',
    withOutBg:
      'https://sb.kaleidousercontent.com/67418/992x558/8c22661163/products-removebg.png',
  },
  animal: {
    withBg:
      'https://sb.kaleidousercontent.com/67418/992x558/ffe4b7190a/animals-org.png',
    withOutBg:
      'https://sb.kaleidousercontent.com/67418/992x558/47de31c5a8/animals.png',
  },
  cars: {
    withBg:
      'https://sb.kaleidousercontent.com/67418/992x558/36cb67f400/cars-org.png',
    withOutBg:
      'https://sb.kaleidousercontent.com/67418/992x558/0c38df0969/cars.png',
  },
};
const backgroundColors = {
  black: 'linear-gradient(178deg, #0a0a0a 0%,#111111 100%)',
  green: 'linear-gradient(178deg, #046922 0%,#03511a 100%)',
  blue: 'linear-gradient(178deg, #0a298f 0%,#062caa 100%)',
  transparent: 'transparent',
};

const sliderMain = document.querySelector('.compare-slider-main');
const sliderRuler = sliderMain.querySelector('.slider-ruler .ruler-tap');
const leftImgCon = document.querySelector('.left-img');
const rightImgCon = document.querySelector('.right-img');
const leftImage = leftImgCon.querySelector('img');
const rightImage = rightImgCon.querySelector('img');
const colorPickers = [...document.querySelectorAll('.color-picker')];
const compareTabs = [...document.querySelectorAll('.compare-tab')];
const sliderLine = document.querySelector('.slider-line');

function handleSlide(e) {
  const currentPosition = e.target.value;
  leftImgCon.style.clipPath = `polygon(0px 0px, ${parseInt(
    currentPosition
  )}% 0px, ${parseInt(currentPosition)}% 100%, 0px 100%)`;
  sliderLine.style.left = `${Math.round(currentPosition)}%`;
}

function handleColorChange(e) {
  colorPickers.forEach((picker) => {
    picker.classList.remove('active');
  });

  e.target.classList.add('active');

  if (e.target.id === 'transparent') {
    rightImgCon.classList.add('transparent');
    return;
  }
  rightImgCon.classList.remove('transparent');
  const bgImage = backgroundColors[e.target.id];

  rightImgCon.style.backgroundImage = bgImage;
}

function handleTabClick(e) {
  sliderMain.classList.add('active');

  compareTabs.forEach((tab) => {
    tab.classList.remove('active');
  });

  e.target.classList.add('active');
  const currentImages = compareDuoImgs[e.target.id];
  leftImage.src = currentImages.withBg;
  rightImage.src = currentImages.withOutBg;

  setTimeout(() => {
    sliderMain.classList.remove('active');
  }, 650);
}

sliderRuler.addEventListener('input', handleSlide);
colorPickers.forEach((picker) => {
  picker.addEventListener('click', handleColorChange);
});
compareTabs.forEach((tab) => {
  tab.addEventListener('click', handleTabClick);
});
