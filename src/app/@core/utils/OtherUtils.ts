
export class OtherUtils {

  static batchGenerator() {
    const totalYear = [];
    let year = 2018;
    const currentYear = new Date().getFullYear();
    while (year <= currentYear) {
      totalYear.push(year.toString());
      year++;
    }
    return totalYear;
  }

  static resetUserWallet(){

  }
}
