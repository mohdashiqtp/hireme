"use client"
import { useEffect, useState } from "react";

export function useUser(){

    interface User  {
        userDetails : {
            name : any,
            about : any,
            email : any,
            phone : any,
            profile : any,
            resume : any
        },
        userExperience : [
            {
                company : any,
                description : any,
                duration : any,
                summary : any,
                startedDate : any,
                endDate : any,
                title : any,
            }
        ],
        userSkills : [
            {
                skillName : any,
            }
        ]
    }

    const [areUserLoading , setAreUserLoading] = useState(false)
    const [userbasic , setUser] = useState<User>();
    const [userRetrievalError, setUserRetrievalError] = useState(null);


    useEffect(() => {
        const retrieveUser = async function () {
            setAreUserLoading(true);
            try {
      
      
              const user = (await (await fetch(`/api/user`)).json()) ;

              setUser(user)

              setAreUserLoading(false)


            } catch (err: any) {
              setUserRetrievalError(err);
            } finally {
            //   userRetrievalError(false);
            }
          };
      
          retrieveUser();

    },[])


    return {
        userbasic,
        areUserLoading
    }
}