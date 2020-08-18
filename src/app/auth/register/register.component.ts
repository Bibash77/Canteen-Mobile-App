import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pattern} from '../../@core/constatnts/pattern';
import {OtherUtils} from '../../@core/utils/OtherUtils';
import {ValidationErrorGenerator} from '../../@core/validation/ValidationErrorGenerator';
import {ModalController} from '@ionic/angular';
import {CommonModalComponent} from '../../@core/components/common-modal/common-modal.component';
import {ModalService} from '../../@core/common-service/modal.service';
import {CommonConstant} from '../../@core/constatnts/CommonConstant';
import {User} from '../../Modal/user';
import {ValidationMessage} from '../../@core/validation/ValidationMessage';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {ToastService} from '../../@core/common-service/toast.service';
import {Action} from 'rxjs/internal/scheduler/Action';
import {ActionConstants} from '../../@core/constatnts/ActionConstants';
import {LoaderService} from '../../@core/Loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorList = [];
  batchList = [];

  constructor(private formBuilder: FormBuilder,
              private modalService: ModalService,
              private userService: UserService,
              private router: Router,
              private toastService: ToastService,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.buildForm();
    this.batchList = OtherUtils.batchGenerator();
  }

  buildForm() {
    const currentYear = new Date().getFullYear().toString();
    this.registerForm = this.formBuilder.group({
      userName: [undefined, [Validators.required]],
      email: [undefined, [Validators.pattern(Pattern.EMAIL)]],
      fullName: [undefined, [Validators.required, Validators.pattern(Pattern.ALPHABET_ONLY)]],
      password: [undefined, Validators.required, Validators.min(6)],
      confirmPassword: [undefined, [Validators.required, Validators.min(6)]],
      number: [undefined, [Validators.pattern(Pattern.NUMBER_MOBILE)]],
      batch: [currentYear, Validators.required],
    });
  }

  async onSubmit() {
    let user = new User();
    if (await this.showError()){
      console.log('here');
      user = this.registerForm.value;
      this.loaderService.showLoader('Registering User...');
      this.userService.registerUser(user).subscribe(async (value) => {
      await this.loaderService.hideLoader();
      await this.router.navigateByUrl('').then(() => {
          this.toastService.presentToast(ValidationMessage.REGISTER  , CommonConstant.SUCCESS);
            }
        );
      this.loaderService.hideLoader();
      } , async (res) => {
        console.log(res);
        await this.loaderService.hideLoader();
        console.log(res.message);
        await this.toastService.presentToast(res.error.message, CommonConstant.ERROR);
      });
   }
  }

 async showError(): Promise<boolean>{
    this.errorList = [];
    await (await ValidationErrorGenerator.getErrorList(this.registerForm)).forEach(value => {
      this.errorList.push(value);
    });
    console.log(this.errorList.length);
    if (this.confirmPasswordChecker()){
     this.errorList.push(ValidationMessage.CONFIRM_PASSWORD);
   }
    if (this.errorList.length > 0) {
      await this.modalService.openModal(CommonModalComponent, CommonConstant.ERROR, 'Invalid Detail', this.errorList);
    }
    return this.errorList.length === 0;
  }

  onBack() {
    window.history.back();
  }

  confirmPasswordChecker() {
    console.log(this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value);
    return this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value;
  }
}
