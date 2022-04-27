import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service'
import { Player } from "../models/player.model"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username:string = "";
  user:Player = {};
  
  constructor(private userService:UserService,
              private route:Router) {

  }

  ngOnInit(): void {
  }
  
  obtenerUser(){
    this.userService.getUser(this.username).subscribe(
      (result) => {
        console.log(result.body[0]);
        this.user = result.body[0];
        if (this.user != null || this.user != undefined ) {
          this.userService.user = result.body[0];
          this.route.navigate(["/game"]);
        }else{
          this.userService.createUser({username: this.username}).subscribe(
            (result2) => {
              this.userService.user = result2.body[0];
              this.route.navigate(["/game"]);
            },
            (error) => {
              console.log("Error creando usuario");
            }
          );
        }
        
      },
      (error) => {
        console.error("error obtener usuario", error);
      }
    );
  }

}


