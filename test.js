function is15MinutesOrLess(time1, time2) {
    const differenceInMilliseconds = time2.getTime() - time1.getTime();
    const differenceInSeconds = differenceInMilliseconds / 1000;
  
    return differenceInSeconds < (15 * 60);
  }
  
  const time1 = new Date();
  const time2 = new Date();
  
  const is15MinutesOrLessResult = is15MinutesOrLess(time1, time2);
  
  if (is15MinutesOrLessResult) {
    console.log("İki zaman nesnesinin farkı 15 dakikadan küçüktür.");
  } else {
    console.log("İki zaman nesnesinin farkı 15 dakikadan büyüktür.");
  }