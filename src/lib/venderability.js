import { defineAbility } from "@casl/ability";

const defineVendorAbilities = (user) => {
    return defineAbility((can, cannot) => {
        if (user.role === 'NonTechnicalVendor' || user.role === 'TechnicalVendor') {
            can('create', 'Quotation');
            can('display', 'Dashboard');
            cannot('notdisplay', 'Dashboard'); // Assuming this is the intent
        } 
        else if (user.role === 'Electrician') {
            cannot('create', 'Quotation');
            cannot('display', 'Dashboard');
        } 
        else if (user.role === 'wardAdmin') {
            cannot('create', 'Quotation');
            cannot('display', 'Dashboard');
        } 
        else if (user.role === 'Super Administrator') {
            cannot('create', 'Quotation');
            cannot('display', 'Dashboard');
        }
    });
};

export default defineVendorAbilities;
