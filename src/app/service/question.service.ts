import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetQuestion } from "../models/getQuestion.model";
import { Question } from "../models/question.model";

@Injectable({
    providedIn: "root"
})
export class QuestionService {

    user:Question = {}
    
    constructor(private http:HttpClient){
        
    }

    getQuestion(category:number):Observable<any>{
        return this.http.get<GetQuestion>(`http://localhost:3000/api/question/category/${category}`);
    }

    

}