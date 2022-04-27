import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../models/player.model';
import { Question } from '../models/question.model';
import { QuestionService } from '../service/question.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  category:number = 1;
  user:Player = {};
  questions:any = [];
  cont:number = 1;
  preguntas:any = {};
  pregunta:Question = {};
  opciones:any = [];
  sigQuestion:number = 0;
  level:string = "Easy";
  point:number = 0;

  constructor(private userService:UserService,
              private questionService:QuestionService,
              private route:Router) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    if (this.user.username === undefined || this.user.username === null) {
      this.route.navigate(["/"]);
    }
    this.obtenerQuestions();
    this.filtrarPreguntas();
  }

  obtenerQuestions(){
    this.questionService.getQuestion(this.category).subscribe(
      (result) => {
        this.questions = result;
      },
      (error) => {
        console.error("error obtener preguntas", error);
      }
    )
  }

  filtrarPreguntas(){
    setTimeout(() => {
      this.preguntas = this.questions.body.filter((question:any) => question.level_questions_idlevel == this.cont );
      this.pregunta = this.preguntas[this.sigQuestion];
      
      this.opcionesRandom(this.pregunta);
    }, 500);
  }

  opcionesRandom(pregunta:Question){
    
    this.opciones = [];
    let mostrar = [pregunta.option1, pregunta.option2, pregunta.option3, pregunta.response];
    let n = mostrar.length;
    for (let i = 0; i < n; i++) {
      let numero  = Math.floor(Math.random() * (mostrar.length - 0) ) + 0;
      console.log(numero);
      this.opciones.push(mostrar[numero]);
      mostrar.splice(numero,1);
    }
    
  }

  validar(numero:number){
    if (this.pregunta.response === this.opciones[numero]) {
      this.sigQuestion ++;
      this.puntos();
      if (this.sigQuestion >= 5) {
        this.sigQuestion = 0;
        this.cont ++;
        this.nivel();
      }
      if (this.cont === 5 && this.sigQuestion === 5) {
        alert(`Felicidades respondiste todas la preguntas correctamente. 
                Obtuviste ${this.point} puntos en esta ocasion`);
        this.user.reward = this.point;
        this.userService.updateUser(this.user).subscribe(
          (result) => {
            this.route.navigate(["/"]);
          },
          (error) => {
            console.log("Error actualizando usuario");
          }
      );;
      }
      this.filtrarPreguntas();
    }else{
      alert(`Game over. Obtuviste ${this.point} puntos en esta ocasion`);
      this.user.reward = this.point;
      this.userService.updateUser(this.user).subscribe(
        (result) => {
          this.route.navigate(["/"]);
        },
        (error) => {
          console.log("Error actualizando usuario");
        }
      );;
    }
  }

  nivel(){
    switch (this.cont) {
      case 1:
        this.level = "Easy";
        break;
      case 2:
        this.level = "Basic";
        break;
      case 3:
        this.level = "Normal";
        break;
      case 4:
          this.level = "Medium";
        break;
      case 5:
          this.level = "Hard";
        break;
    }
  }

  puntos(){
    switch (this.cont) {
      case 1:
        this.point += 1; 
        break;
      case 2:
        this.point += 2; 
        break;
      case 3:
        this.point += 3; 
        break;
      case 4:
        this.point += 4; 
        break;
      case 5:
        this.point += 5; 
        break;
    }
  }

  terminar(){
    this.user.reward = this.point;
      this.userService.updateUser(this.user).subscribe(
        (result) => {
          this.route.navigate(["/"]);
        },
        (error) => {
          console.log("Error actualizando usuario");
        }
      );;
  }

}
