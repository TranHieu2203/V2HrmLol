import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';

import { Auth } from '../interfaces/auth';
import { LoginRequest } from '../interfaces/user';

import { CommonHttpRequestService } from './common-http-request.service';
import { MessageService } from './message.service';
import { RandomAvatarService } from './random-avatar.service';

export interface IServerModel {
  modelName: string,
  baseUrl: string,
  loginUrl: string,
  refreshTokenUrl: string,
  getEmployeesUrl?: string,
  getAccountInfoUrl?: string,
  updateAccountInfoUrl?: string,
  updateEmployeeMainInfoUrl?: string,
  updateEmployeePassportUrl?: string,
  updateEmployeeVisaUrl?: string,
  updateEmployeeEducationUrl?: string,
  updateEmployeeWorkPermitUrl?: string,
  updateEmployeeCertificateUrl?: string,
  updateEmployeeBankUrl?: string,
  getGendersUrl?: string,
  getProvincesUrl?: string,
  getDistrictsUrl?: string,
  getWardsUrl?: string,
  getEducationUrl?: string,
  getUserbankUrl?: string,
  getBonusListUrl?: string,
  getSituationListUrl?: string,
  getPaperListUrl?: string,
  getDisciplineListUrl?: string,
  getContractListUrl?: string,
  getWorkingListUrl?: string,
  getInschangeListUrl?: string,
  updateEmployeeInfoUrl?: string,
  updateEmployeeAddressUrl?: string,
  updateEmployeeCurAddressUrl?: string,
  updateEmployeeContactInfoUrl?: string,

}

export const HISTAFF2022: IServerModel = {
  modelName: 'HiSraff2022',
  baseUrl: 'https://api.histaff.online/api',
  loginUrl: 'https://api.histaff.online/api/authen/clientslogin',
  refreshTokenUrl: 'https://api.histaff.online/api/authen/refreshtoken',
  getAccountInfoUrl: 'https://api.histaff.online/api/client/profile/getemployeeinfo',
  // updateAccountInfoUrl: 'https://api.histaff.online/api/client/profile/updateemployee',
  updateAccountInfoUrl: 'https://api.histaff.online/api/client/profile/employeeedit',
  updateEmployeeMainInfoUrl: 'https://api.histaff.online/api/client/profile/employeemaininfoedit',

  updateEmployeeInfoUrl: 'https://api.histaff.online/api/client/profile/employeeinfoedit',
  updateEmployeeAddressUrl: 'https://api.histaff.online/api/client/profile/employeeaddressedit',
  updateEmployeeCurAddressUrl: 'https://api.histaff.online/api/client/profile/employeecuraddressedit',
  updateEmployeeContactInfoUrl: 'https://api.histaff.online/api/client/profile/employeecontactinfoedit',

  updateEmployeePassportUrl: 'https://api.histaff.online/api/client/profile/employeepassportedit',
  updateEmployeeVisaUrl: 'https://api.histaff.online/api/client/profile/employeevisaedit',
  updateEmployeeEducationUrl: 'https://api.histaff.online/api/client/profile/employeeeducationedit',
  updateEmployeeWorkPermitUrl: 'https://api.histaff.online/api/client/profile/employeeworkpermitedit',
  updateEmployeeCertificateUrl: 'https://api.histaff.online/api/client/profile/employeecertificateedit',
  updateEmployeeBankUrl: 'https://api.histaff.online/api/client/profile/employeebankedit',
  getGendersUrl: 'https://api.histaff.online/api/hr/otherlist/gender',
  getProvincesUrl: 'https://api.histaff.online/api/hr/province/getlistprovince',
  getDistrictsUrl: 'https://api.histaff.online/api/hr/province/getlistdistrict',
  getWardsUrl: 'https://api.histaff.online/api/hr/province/getlistward',
  getEducationUrl: 'https://api.histaff.online/api/client/profile/getemployeeinfo',
  getUserbankUrl: 'https://api.histaff.online/api/client/profile/getbanklist',
  getBonusListUrl: 'https://api.histaff.online/api/client/profile/getbonusinfo',
  getSituationListUrl: 'https://api.histaff.online/api/client/profile/getemployeefamily',
  getPaperListUrl: 'https://api.histaff.online/api/client/profile/getlistemployeepaper',
  getDisciplineListUrl: 'https://api.histaff.online/api/client/profile/getdisciplineinfo',
  getContractListUrl: 'https://api.histaff.online/api/client/profile/getcontractinfo',
  getWorkingListUrl: 'https://api.histaff.online/api/client/profile/getworkinginfo',
  getInschangeListUrl: 'https://api.histaff.online/api/client/profile/getinschangeinfo',
}

export const SERVER0: IServerModel = {
  modelName: 'Oracle_localhost',
  baseUrl: 'https://localhost:44348/api',
  loginUrl: 'https://localhost:44348/api/authen/clientslogin',
  refreshTokenUrl: 'https://localhost:44348/api/authen/refreshtoken',
  getAccountInfoUrl: 'https://localhost:44348/api/hr/profile/getemployeeinfo',
}

export const SERVER1: IServerModel = {
  modelName: 'HiStaff2021_server',
  baseUrl: 'https://192.168.60.122:5000/api',
  loginUrl: 'https://192.168.60.122:5000/api/authenticate/login',
  refreshTokenUrl: 'https://192.168.60.122:5000/api/authenticate/refreshtoken',
  getEmployeesUrl: 'https://192.168.60.122:5002/api/employee/getlistemployee',
}
export const SERVER2: IServerModel = {
  modelName: 'HiStaff2021_localhost',
  baseUrl: 'https://localhost:5000/api',
  loginUrl: 'https://localhost:5000/api/authenticate/login',
  refreshTokenUrl: 'https://localhost:5000/api/authenticate/refreshtoken',
  //getEmployeesUrl: 'https://localhost:5002/api/employee/getlistemployee',
  getEmployeesUrl: 'https://192.168.60.122:5002/api/employee/getlistemployee',
}
export const SERVER3: IServerModel = {
  modelName: 'MiukaFoto',
  baseUrl: 'https://miukafoto.com/api',
  loginUrl: 'https://miukafoto.com/api/users/authenticate',
  refreshTokenUrl: 'https://miukafoto.com/api/users/refresh-token',
}
export const SERVER4: IServerModel = {
  modelName: 'MiukaFoto_localhost',
  baseUrl: 'https://localhost:5001/api',
  loginUrl: 'https://localhost:5001/api/users/authenticate',
  refreshTokenUrl: 'https://localhost:5001/api/users/refresh-token',
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverModel: IServerModel = HISTAFF2022;

  initialAuth: Auth = {
    loading: false,
    error: false,
    message: '',
    data: null,
    loginStatus: 0,
    tokenStatus: 0
  }

  // private baseURL = 'https://miukafoto.com/api'
  //private baseURL = 'https://192.168.60.122:5000/api'
  // private baseURL = 'https://localhost:5000/api'
  // private baseURL = 'https://localhost:5001/api'

  auth: Auth = this.initialAuth;
  loading = new BehaviorSubject<boolean>(false);
  authenticated$ = new BehaviorSubject<boolean>(false);

  fullname!: string;
  avatar!: string;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  constructor(
    private router: Router,
    private messenger: MessageService,
    private commonHttpRequestService: CommonHttpRequestService,
    private randomAvatarService: RandomAvatarService,
  ) {
    this.avatar = this.randomAvatarService.get();
  }

  getAuthorizationToken(): string {
    if (this.serverModel.modelName.includes('MiukaFoto')) return this.auth.data?.jwtToken;
    return this.auth.data?.token;
  }

  logIn(loginRequest: LoginRequest): Observable<any> {

    this.auth = {
      ...this.auth,
      loading: true,
      error: false,
      message: 'Login request sent',
      data: null,
      loginStatus: 1,
    }

    this.loading.next(true);

    return this.commonHttpRequestService.makePostRequest(
      'logInRequest',
      this.serverModel.loginUrl,
      loginRequest,
    )
  }

  refreshToken(token?: string | undefined | null): Observable<any> {

    this.loading.next(true);

    return this.commonHttpRequestService.makePostRequest(
      'refreshTokenRequest',
      this.serverModel.refreshTokenUrl,
      !!token ? { token } : {},
    )
  }

  /*
  isLoggedIn(): boolean {
    const checkValue = !!this.auth.data;
    debugger
    this.authenticated$.next(checkValue);
    return checkValue;
  }
  */

  logout(emptyUpToken: boolean | undefined = true): Observable<any> {
    this.auth = {
      loading: false,
      error: false,
      message: '',
      data: null,
      loginStatus: 0,
      tokenStatus: 0
    }

    emptyUpToken && !!localStorage && !!localStorage.getItem('token') && localStorage.setItem('token', 'logged_out');

    this.authenticated$.next(false);
    return of(true)
  }

  public getJsonData(): string {
    return (JSON.stringify(this.auth.data, null, 2));
  }

}
