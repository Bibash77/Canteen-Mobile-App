import { Component, OnInit } from '@angular/core';
import {SearchDto} from '../../../Modal/SearchDto';
import {ActivatedRoute} from '@angular/router';
import {TopUpHistoryService} from '../../../@core/service/top-up-history.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-top-up-cost-detail',
  templateUrl: './top-up-cost-detail.component.html',
  styleUrls: ['./top-up-cost-detail.component.scss'],
})
export class TopUpCostDetailComponent implements OnInit {
  topUpSearch: SearchDto = new SearchDto();
  topUpHistoryData = [];
  constructor(protected topUpHistoryService: TopUpHistoryService,
              private route: ActivatedRoute,
              private navCtrl: NavController) { }
  page = 1;
  size = 10;
  pageNo = 1;
  totalPages = 0;
  ngOnInit() {
    // this.route.snapshot.params.id;
    this.topUpSearch.userId = this.route.snapshot.paramMap.get('id');
    console.log('here');
    this.loadData();
  }


  loadData() {
    this.topUpHistoryService.topUpHistory(this.topUpSearch, this.pageNo, this.size).subscribe((response: any) => {
      console.log(response);
      if (response.detail.content.length <= 0) {
       return;
      }
      // tslint:disable-next-line:no-shadowed-variable
      response.detail.content.forEach( response => {
        this.topUpHistoryData.push(response);
      });
      console.log(this.topUpHistoryData);
      this.totalPages = response.detail.totalPages;
      this.pageNo = response.detail.pageable.pageNumber + 2;
      console.log(response.detail.pageable.pageNumber);
    }, error => {
      console.error(error);
    });
  }

  loadMore(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.loadData();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
     /* if (this.page < this.totalPages) {
        event.target.disabled = true;
      }*/
    }, 500);
  }

  navigateTab(nav){
    this.navCtrl.navigateForward(nav);
  }
}
