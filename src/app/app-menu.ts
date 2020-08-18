
export class AppMenu {
  private static MENU_ITEMS = [
    {
      title : 'Home',
      url   : '/canteen',
      icon  : 'home'
    },
    {
      title : 'Notification',
      url   : '/canteen/notification',
      icon  : 'notifications'
    },
    {
      title : 'Configure',
      url   : '/contacts',
      icon  : 'build'
    },
    {
      title: 'Transaction',
      url: '/canteen/transaction-detail',
      icon: 'cart',
    },
    {
      title: 'login',
      url: '/login',
      icon: 'log-in-outline',
    }
  ];

  static getMenu(){
    return this.MENU_ITEMS;
  }
}
