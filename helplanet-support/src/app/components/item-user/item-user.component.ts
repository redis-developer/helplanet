import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user.dto';
import { SnackComponent } from '../snackbar/snack/snack.component';

@Component({
  selector: 'app-item-user',
  templateUrl: './item-user.component.html',
  styleUrls: ['./item-user.component.css']
})
export class ItemUserComponent implements OnInit {
  @Input('data') data:Partial<User>;  
  @Input('userOrg') userOrg:string = ''; 
  constructor(
    private _snackBar: MatSnackBar,
    private userService:UserService
  ) { }

  ngOnInit(): void {
  }

  getRole(){
    switch (this.data.role) {
      case '0':
        return 'Administrator'
      case '1':
        return 'User Reporter'
      case '2':
        return 'User Reporter/Organization'
      default:
        return 'no assignment'
    }
  }

  updateRole(){
    console.log("updating...");
    this.userService.setRole(this.data.email, this.data.role)
    .subscribe((res)=>{
      this.openSnackBar(`User role updated`);        
    },
    async (err)=>{        
      console.log("Err=>",err);
      if(!err.status)
      {
        this.openSnackBar(`${err}`);        
      }else{
        this.openSnackBar(`(${err.status}) - ${err.message}`);        
      }
    })
  }

  openSnackBar(message) {    
    this._snackBar.openFromComponent(SnackComponent, {
      duration: 5*1000,
      data:message
    });
  }

}
