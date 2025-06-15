// import LoginUI from "../pages/Auth/LoginUI";
// import {
//   CorporateResourceHeadLayout,
//   FinanceLayout,
//   EICHeadLayout,
//   EICLayout,
//   ExecutiveLayout,
//   LandAndInfraDevelopmentHeadLayout,
//   DesignAndConstructionLayout,
//   DesignAndConstructionHeadLayout,
//   MPandLBHeadLayout,
//   GISLayout,
//   OperationAndManagementHeadLayout,
//   InvestorAftercareLayout,
//   ParkAdminLayout,
//   ParkStaffLayout,
//   PromotionAndMarketingLayout,
//   SystemAdminHeadLayout,
//   SystemAdminLayout,
// } from "../layouts";
// import ChangePassword from "../pages/Views/Shared/ChangePassword";

// export default function GetAppropriateLayout({ setInitialView, user }) {
//   const park = user?.park_id;
//   const department = user?.department_id?.toUpperCase();
//   const role = user?.role?.toUpperCase();
//   //set user id for all access
//   //const decodedUser =useDecodedUser();
//   //console.log("Role: " + role);
//   if (user.status === "RESET") {
//     setInitialView(<ChangePassword />);
//   } else if (park !== "000") {
//     switch (role) {
//       case "PROFESSIONAL":
//         setInitialView(<ParkStaffLayout />);
//         break;
//       case "HEAD":
//         setInitialView(<ParkAdminLayout />);
//         break;
//       default:
//         setInitialView(<LoginUI />);
//     }
//   } else {
//     switch (department) {
//       case "EXEC":
//         setInitialView(<ExecutiveLayout />);
//         break;
//       /*case "ADMIN":
//         setInitialView(<LandAdminLayout />);
//         break;*/
//       case "LI":
//         role === "HEAD" && setInitialView(<LandAndInfraDevelopmentHeadLayout />);
//         break;
//       case "MP":
//         role === "HEAD" && setInitialView(<MPandLBHeadLayout />);
//         break;
//       case "GIS":
//         if (role === "LI") {
//           setInitialView(<LandAndInfraDevelopmentHeadLayout />);
//           return;
//         }
//         role === "HEAD" ? setInitialView(<MPandLBHeadLayout />) : setInitialView(<GISLayout />);
//         break;
//       case "DES":
//         role === "HEAD"
//           ? setInitialView(<DesignAndConstructionHeadLayout />)
//           : setInitialView(<DesignAndConstructionLayout />);
//         break;
//       case "SA":
//         role === "HEAD" ? setInitialView(<SystemAdminHeadLayout />) : setInitialView(<SystemAdminLayout />);
//         break;
//       case "PROM":
//         setInitialView(<PromotionAndMarketingLayout />);
//         break;
//       case "FINANCE":
//         role === "HEAD" ? setInitialView(<CorporateResourceHeadLayout />) : setInitialView(<FinanceLayout />);
//         break;
//       case "EIC":
//         role === "HEAD" ? setInitialView(<EICHeadLayout />) : setInitialView(<EICLayout />);
//         break;
//       case "OP-IA":
//         role === "HEAD"
//           ? setInitialView(<OperationAndManagementHeadLayout />)
//           : setInitialView(<InvestorAftercareLayout />);
//         break;
//       case user?.park_id === "000":
//         role === "HEAD" ? setInitialView(<ParkAdminLayout />) : setInitialView(<ParkStaffLayout />);
//         break;
//       default:
//         setInitialView(<LoginUI />);
//     }
//   }
// }


import LoginUI from "../pages/Auth/LoginUI";
import {
  CorporateResourceHeadLayout,
  FinanceLayout,
  EICHeadLayout,
  EICLayout,
  ExecutiveLayout,
  LandAndInfraDevelopmentHeadLayout,
  DesignAndConstructionLayout,
  DesignAndConstructionHeadLayout,
  MPandLBHeadLayout,
  GISLayout,
  OperationAndManagementHeadLayout,
  InvestorAftercareLayout,
  ParkAdminLayout,
  ParkStaffLayout,
  PromotionAndMarketingLayout,
  SystemAdminHeadLayout,
  SystemAdminLayout,
} from "../layouts";
import ChangePassword from "../pages/Views/Shared/ChangePassword";

export default function GetAppropriateLayout({ setInitialView, user }) {
  // Early return if user is null/undefined
  if (!user) {
    setInitialView(<LoginUI />);
    return;
  }

  const park = user?.park_id;
  const department = user?.department_id?.toUpperCase();
  const role = user?.role?.toUpperCase();

  // Handle RESET status first
  if (user?.status === "RESET") {
    setInitialView(<ChangePassword user={user} />); // Pass user to ChangePassword
    return;
  }

  // Park-specific layouts
  if (park !== "000") {
    switch (role) {
      case "PROFESSIONAL":
        setInitialView(<ParkStaffLayout />);
        break;
      case "HEAD":
        setInitialView(<ParkAdminLayout />);
        break;
      default:
        setInitialView(<LoginUI />);
    }
    return;
  }

  // Department-specific layouts
  switch (department) {
    case "EXEC":
      setInitialView(<ExecutiveLayout />);
      break;
    case "LI":
      role === "HEAD" && setInitialView(<LandAndInfraDevelopmentHeadLayout />);
      break;
    case "MP":
      role === "HEAD" && setInitialView(<MPandLBHeadLayout />);
      break;
    case "GIS":
      if (role === "LI") {
        setInitialView(<LandAndInfraDevelopmentHeadLayout />);
        return;
      }
      role === "HEAD" ? setInitialView(<MPandLBHeadLayout />) : setInitialView(<GISLayout />);
      break;
    case "DES":
      role === "HEAD"
        ? setInitialView(<DesignAndConstructionHeadLayout />)
        : setInitialView(<DesignAndConstructionLayout />);
      break;
    case "SA":
      role === "HEAD" ? setInitialView(<SystemAdminHeadLayout />) : setInitialView(<SystemAdminLayout />);
      break;
    case "PROM":
      setInitialView(<PromotionAndMarketingLayout />);
      break;
    case "FINANCE":
      role === "HEAD" ? setInitialView(<CorporateResourceHeadLayout />) : setInitialView(<FinanceLayout />);
      break;
    case "EIC":
      role === "HEAD" ? setInitialView(<EICHeadLayout />) : setInitialView(<EICLayout />);
      break;
    case "OP-IA":
      role === "HEAD"
        ? setInitialView(<OperationAndManagementHeadLayout />)
        : setInitialView(<InvestorAftercareLayout />);
      break;
    default:
      setInitialView(<LoginUI />);
  }
}