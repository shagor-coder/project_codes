import { useEffect, useState } from "react";

const calculatePrice = (data) => {
  const {
    serviceType,
    roomNumberAndSize,
    windows,
    moveInMoveOut,
    loadOfLaundry,
    pets,
    kitchenCleaning,
    fridgeCleaning,
    eachCabinet,
    additionalRoom,
    additionalBathRoom,
    hepa,
    wallsCleaning,
  } = data;

  let serviceFee = 0;
  let roomNumberFee = 0;
  let windowsFee = 30;
  let moveInMoveOutFee = 0;
  let loadOfLaundryFee = 0;
  let petsFee = 0;
  let kitchenCleaningFee = 0;
  let fridgeCleaningFee = 0;
  let eachCabinetFee = 25;
  let additionalRoomFee = 60;
  let additionalBathRoomFee = 40;
  let hepaFee = 0;
  let wallsCleaningFee = 0;

  switch (serviceType) {
    case "Regular Clean":
      serviceFee = 80;
      break;
    case "Deep Cleaning":
      serviceFee = 100;
      break;
    case "Professional Deep Clean":
      serviceFee = 150;
      break;
    case "Cleaning Services Airbnb":
      serviceFee = 200;
      break;
    case "After Party Clean Up":
      serviceFee = 220;
      break;
    case "Balcony":
      serviceFee = 70;
      break;

    default:
      serviceFee;
  }

  switch (roomNumberAndSize) {
    case "600 sqft - 1 Room":
      roomNumberFee = 80;
      break;
    case "601 - 800 sqft - 1 Room":
      roomNumberFee = 100;
      break;
    case "601 - 1000 sqft - 1 Room":
      roomNumberFee = 150;
      break;
    case "1001 - 1200 sqft - 2 Room":
      roomNumberFee = 200;
      break;
    case "1201 - 1500 sqft - 2 Room":
      roomNumberFee = 220;
      break;
    case "1801 - 2000 sqft - 3 Room":
      roomNumberFee = 260;
      break;
    case "1501 - 1800 sqft - 2 Room":
      roomNumberFee = 300;
      break;
    case "2001 - 2500 sqft - 4 Room":
      roomNumberFee = 400;
      break;
    case "2501 - 3000 sqft - 3 Room":
      roomNumberFee = 500;
      break;
    case "3001 - 3500 sqft - 5 Room":
      roomNumberFee = 600;
      break;
    case "3500 - 5000 sqft - 6 Room":
      roomNumberFee = 700;
      break;

    default:
      serviceFee;
  }

  switch (moveInMoveOut) {
    case "1":
      moveInMoveOutFee = 110;
      break;
    default:
      moveInMoveOutFee;
  }

  switch (loadOfLaundry) {
    case "1":
      loadOfLaundryFee = 40;
      break;
    default:
      loadOfLaundryFee;
  }

  switch (pets) {
    case "1":
      petsFee = 15;
      break;
    default:
      petsFee;
  }

  switch (kitchenCleaning) {
    case "1":
      kitchenCleaningFee = 40;
      break;
    default:
      kitchenCleaningFee;
  }

  switch (loadOfLaundry) {
    case "1":
      loadOfLaundryFee = 40;
      break;
    default:
      loadOfLaundryFee;
  }

  switch (fridgeCleaning) {
    case "1":
      fridgeCleaningFee = 15;
      break;
    default:
      fridgeCleaningFee;
  }

  switch (wallsCleaning) {
    case "1":
      wallsCleaningFee = 40;
      break;
    default:
      wallsCleaningFee;
  }

  switch (hepa) {
    case "1":
      hepaFee = 300;
      break;
    default:
      hepaFee;
  }

  const totalPrice = Number(
    serviceFee +
      roomNumberFee +
      Number(parseInt(windows * windowsFee).toFixed(2)) +
      moveInMoveOutFee +
      loadOfLaundryFee +
      petsFee +
      fridgeCleaningFee +
      wallsCleaningFee +
      hepaFee +
      kitchenCleaningFee +
      Number(parseInt(additionalRoom * additionalRoomFee).toFixed(2)) +
      Number(parseInt(additionalBathRoom * additionalBathRoomFee).toFixed(2)) +
      Number(parseInt(eachCabinet * eachCabinetFee).toFixed(2))
  );

  data.totalPrice = totalPrice;

  return totalPrice;
};

const Price = ({ formData }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(calculatePrice(formData));
  }, [formData]);

  return <div>Total: {price}$</div>;
};

export default Price;
