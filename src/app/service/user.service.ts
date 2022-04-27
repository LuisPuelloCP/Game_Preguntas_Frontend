import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreatePlayer } from "../models/createUser.model";
import { GetUser } from "../models/getUsers.model";
import { Player } from "../models/player.model";

@Injectable({
    providedIn: "root"
})
export class UserService {

    user:Player = {}
    
    constructor(private http:HttpClient){
        
    }

    getUser(username:string):Observable<any>{
        return this.http.get<GetUser>(`http://localhost:3000/api/users/user/${username}`);
    }

    createUser(body:object):Observable<any>{
        return this.http.post<CreatePlayer>(`http://localhost:3000/api/users/create`, body)
    }

    updateUser(body:object):Observable<any>{
        return this.http.post<CreatePlayer>(`http://localhost:3000/api/users/update`, body)
    }
}