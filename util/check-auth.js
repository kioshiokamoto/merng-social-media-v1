import jwt from 'jsonwebtoken';
import { AuthenticationError  } from 'apollo-server'

import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.SECRET;

export const checkAuth = (context) =>{
    //context = {...headers}
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        //Bearer ... (convention)
        const token = authHeader.split("Bearer ")[1];
        if(token){
            try {
                const user = jwt.verify(token, SECRET);
                return user;
            } catch (error) {
                throw new AuthenticationError('Invalid/expired token');
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]\'')
    }
    throw new Error('Authorization header must be provided')
}