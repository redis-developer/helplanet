import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { PaginationDTO } from 'src/models/pagination.dto';
import { User } from 'src/models/user.dto';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  @Input('title') title:string = '';
  @Input('isFilter') isFilter:boolean = false;  
  userOrg:string = '';  
  showButton = true;
  page = 0;
  
  email:string = '';
  data:Partial<User>[] | null = null;    
  dataFilter:Partial<User>[] = [];
  constructor(
    private userService:UserService,
    private auth:AuthService,
  ) { 
    this.userOrg = this.auth.getStorage() ? this.auth.getStorage().email : '';
    if(!this.isFilter){
     
      this.getUsers();
    } 
  }

  ngOnInit(): void {
  }

  addData(){
    this.page++;
    this.getUsers();
  }

  getUsers(){

    this.userService.listAll(this.page)
    .subscribe(
      (res:PaginationDTO<Partial<User>>)=>{
        console.log(res);
        if(this.data==null){
          this.data = [];
        }
        if(res.result.length == 0){
          this.showButton = false;
        }
        this.data = [...this.data,...res.result];
      }
    );
  }

  getUsersFilter(){
    this.userService.listAll(this.page,this.email)
    .subscribe(
      (res:PaginationDTO<Partial<User>>)=>{        
        console.log(this.dataFilter,res.result);
        this.dataFilter.push(...res.result);
        console.log(this.dataFilter);
      }
    );
  }

  searchFn(){
    if(this.isFilter)
    {
      this.getUsersFilter();
    }
  }
}
