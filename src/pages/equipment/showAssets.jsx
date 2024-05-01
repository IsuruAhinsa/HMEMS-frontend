import EquipmentList from "./equipmentList"
import defineAbilities from "../../lib/defineAbility";
import { useAuthContext
 } from "@/hooks/useAuthContext";
const ShowAssets = () => {
    const { user } = useAuthContext();
    const abilities = defineAbilities(user);
    const canNotCreateUser = abilities.can("create", "User");
   // const canCreateUser=abilities.cannot("create","User")
   
  return (
    <>
       { canNotCreateUser &&

        <EquipmentList/>
        
        }
    </>
 
);

 

}
export default ShowAssets



