const convertDateToString = (date: any) => {
   const year = date.$y;
   const month = date.$M + 1;
   const day = date.$D;
   const stringDay = day < 10 ? `0${day}` : day;
   const stringDate = `${year}-${month}-${stringDay}`;
   return stringDate;
}

export default convertDateToString;