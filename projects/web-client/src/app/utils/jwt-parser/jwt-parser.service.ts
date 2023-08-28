import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";


@Injectable({
    providedIn: 'root'
})
export class JwtParser {
  
    decode(token: string): { [key: string]: any } {
        if (!token) return;
        try {
            return jwt_decode(token);
        } catch(e) {
            return;
        }
        
    }

    decodeV2<T>(token: string): T {
        if (!token) return;
        try {
            return jwt_decode(token);
        } catch(e) {
            return;
        }
        
    }
}