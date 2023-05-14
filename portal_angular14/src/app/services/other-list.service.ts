import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from './common-http-request.service';
import { AuthService } from './auth.service';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherListService {

  genderList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  provinceList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  districtList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])

  wardList = new BehaviorSubject<{
    key: string,
    value: string
  }[]>([])


  constructor(private commonHttpRequestService: CommonHttpRequestService, private authService: AuthService) {
    this.commonHttpRequestService.makeGetRequest('getGenderList', this.authService.serverModel.getGendersUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.genderList.next(newList);
        }
      })

      this.commonHttpRequestService.makeGetRequest('getProvinceList', this.authService.serverModel.getProvincesUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.provinceList.next(newList);
        }
      })

      this.commonHttpRequestService.makeGetRequest('getDistrictList', this.authService.serverModel.getDistrictsUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.districtList.next(newList);
        }
      })

      this.commonHttpRequestService.makeGetRequest('getWardList', this.authService.serverModel.getWardsUrl!)
      .subscribe(x => {
        if (x.ok && x.status === 200) {
          const newList: {
            key: string,
            value: string
          }[] = [];
          x.body.data.map((g: any) => newList.push({
            key: g.id.toString(),
            value: g.name
          }))
          this.wardList.next(newList);
        }
      })
  }
}
