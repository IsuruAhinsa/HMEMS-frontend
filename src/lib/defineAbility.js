import { defineAbility } from "@casl/ability";

const defineAbilities = (user) => {
    return defineAbility((can, cannot) => {
        if (user.role === 'Super Administrator') {
            can('create', 'User');
            
        } else if (user.role === 'NonTechnicalVendor') {
            cannot('create', 'User');
        }else if (user.role ==='Electrician'){
            cannot('create','User')
        }else if (user.role ==='wardAdmin' ){
               
            cannot('create','User') 

        }else if (user.role ==='wardAdmin' ){
            can('create','Assets')
            
        }else if (user.role==='Super Administrator')
        {
            cannot ('create','Assets')
        }
          
    });
};

export default defineAbilities;
