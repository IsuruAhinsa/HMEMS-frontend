import { defineAbility } from "@casl/ability";

const defineVendorAbilities = (user) => {
    return defineAbility((can, cannot) => {
        if (user.role === 'NonTechnicalVendor') {
            can('create', 'Quotation');
            can('display', 'Dashboard');
            can('view', 'VendorRow'); // Ability to view vendor rows
            cannot('notdisplay', 'Dashboard'); // Assuming this is the intent
        } 
        else if (user.role === 'TechnicalVendor') {
            can('create', 'Quotation');
            can('display', 'Dashboard');
            can('view', 'VendorRow'); // Ability to view vendor rows
            cannot('notdisplay', 'Dashboard'); // Assuming this is the intent
        } 
        else if (user.role === 'Electrician') {
            cannot('create', 'Quotation');
            cannot('display', 'Dashboard');
            cannot('view', 'VendorRow'); // No access to vendor rows
        } 
        else if (user.role === 'wardAdmin') {
            cannot('create', 'Quotation');
            cannot('display', 'Dashboard');
            cannot('view', 'VendorRow'); // No access to vendor rows
        } 
        else if (user.role === 'Super Administrator') {
            cannot('create', 'Quotation');
            cannot('display', 'Dashboard');
            can('view', 'VendorRow'); // Access to view all vendor rows
        }
    });
};

export default defineVendorAbilities;
