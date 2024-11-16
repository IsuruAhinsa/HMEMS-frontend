import { defineAbility } from "@casl/ability";

const defineTechnicientAbilities = (user) => {
    return defineAbility((can, cannot) => {
        if (user.role === 'Super Administrator') {
            can('create', 'User');
            cannot('create', 'Assets');
        } else if (user.role === 'NonTechnicalVendor') {
            cannot('create', 'User');
        } else if (user.role === 'Electrician') {
            cannot('create', 'User');
            can('view', 'ElectricianCard');  // Ability to view the Electrician card
            can('display', 'Dashboard');
            cannot('notdisplay', 'Dashboard');
          
        } 
     
     
        else if (user.role === 'wardAdmin') {
            cannot('create', 'User');
            can('create', 'Assets');
        }
    });
};

export default defineTechnicientAbilities ;
