import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorageUtil} from '../../@core/utils/local-storage-util';
import {ObjectUtil} from '../../@core/utils/ObjectUtil';
import {Status} from '../../@core/Status';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConfig} from '../../@core/utils/ApiConfig';
import {LoadingController, NavController} from '@ionic/angular';
import {LoaderService} from '../../@core/Loader.service';
import {ActionConstants} from '../../@core/constatnts/ActionConstants';
import {ToastService} from '../../@core/common-service/toast.service';
import {CommonConstant} from '../../@core/constatnts/CommonConstant';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  spinner = false;
  private securityUrl = ApiConfig.TOKEN;
  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic RGl2eWEtQ2FudGVlbjpEaXZ5YUd5YW4xMjMqIyo=',
  });

  constructor(private router: Router,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private loaderService: LoaderService,
              public navCtrl: NavController,
              private toastService: ToastService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm =  this.formBuilder.group({
      userName: [undefined , Validators.required],
      password: [undefined , Validators.required]
    });
    /* this.forgotPasswordForm = this.formBuilder.group({
       userName: [undefined , Validators.required],
       batch : [undefined , Validators.required]
     });*/
  }

  async onLogin() {
    this.spinner = true;
    const loginData = {
      userName: this.loginForm.get('userName').value,
      password: this.loginForm.get('password').value
    };
    const datas = `grant_type=password&username=${loginData.userName}&password=${loginData.password}`;
    this.loaderService.showLoader(ActionConstants.LOGIN_MESSAGE);
    await this.http.post(this.securityUrl, datas, {headers: this.headers})
    .subscribe(async (responseToken: any) => {
          const storage = LocalStorageUtil.getStorage();
          storage.at = responseToken.access_token;
          storage.rt = responseToken.refresh_token;
          storage.ty = responseToken.token_type;
          storage.et = responseToken.expires_in;
          LocalStorageUtil.setStorage(storage);
          console.log(storage.at);

          await this.userService.getLoggedInUser().toPromise().then(async (data: any) => {
            if (!ObjectUtil.isEmpty(data.detail.id)) {
              storage.roleType = data.detail.roleType;
              storage.username = data.detail.userName;
              storage.status = data.detail.status;
              storage.fullName = data.detail.fullName;
              storage.email = data.detail.email;
              storage.batch = data.detail.batch;
              console.log(data.detail.status === Status.INACTIVE.toString() , data.detail.status , Status.INACTIVE.toString());
              if (data.detail.status === Status.INACTIVE.toString()) {
                LocalStorageUtil.setStorage(storage);
                await this.router.navigateByUrl('/user-inactive');
                return;
              }
              storage.userId = (data.detail.id).toString();
              storage.currentBalance = data.detail.walletAmount;
              storage.userCode = data.detail.userCode;
              LocalStorageUtil.setStorage(storage);
              this.spinner = false;
              await this.loaderService.hideLoader();
              await this.router.navigateByUrl('/canteen/home');
            } else {
              this.spinner = false;
              await this.toastService.presentToast('Unable to login with provided detail', CommonConstant.WARNING);
            }
          }, error => console.error(error));
        },
        async error => {
      await this.toastService.presentToast(error.error.message, CommonConstant.ERROR);
      await this.loaderService.hideLoader();
      console.error(error);
        }
    );
    this.loaderService.hideLoader();
  }

  onClickForgotPassword(){

  }

  onRegister(){
    this.navCtrl.navigateForward('/register');
  }

  createLoader(){

  }
}
