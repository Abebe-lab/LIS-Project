// FinanceRuleSetting.js
import {
  Typography,
} from "@mui/material";
//import useDecodedUser from "../../../../../services/hooks/useDecodedUser";
import FormContainer from "../../../../../components/Forms/FormContainer";

const ApproveImport = () => {
  //const decodedUser = useDecodedUser();

  const handleSubmit = async (e) => {
   return true
  };

  return (
    <FormContainer title="Finance Rule Setting" onSubmit={handleSubmit}>
     <Typography >No Files to approve</Typography>
    </FormContainer>
  );
};

export default ApproveImport;
