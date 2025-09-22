import PolicyLoading from "../../../components/loader/PolicyLoading";
import UpdateTermsForm from "../../../components/policy/UpdateTermsForm";
import { useGetTermsQuery } from "../../../redux/features/policy/policyApi";

const TermsAndCondition = () => {
   const {data, isLoading, isError} = useGetTermsQuery(undefined);

   if(isLoading){
     return <PolicyLoading/>
   }

   if(!isLoading && !isError && data){
    return <UpdateTermsForm description={data?.data?.description}/>
   }

   if(!isLoading && isError){
    return <h1>Something went wrong</h1>
   }
};

export default TermsAndCondition;