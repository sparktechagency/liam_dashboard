import PolicyLoading from "../../../components/loader/PolicyLoading";
import UpdatePrivacyForm from "../../../components/policy/UpdatePrivacyForm";
import { useGetPrivacyPolicyQuery } from "../../../redux/features/policy/policyApi";

const PrivacyPolicy = () => {
   const {data, isLoading, isError} = useGetPrivacyPolicyQuery(undefined);

   if(isLoading){
     return <PolicyLoading/>
   }

   if(!isLoading && !isError && data){
    return <UpdatePrivacyForm description={data?.data?.description}/>
   }

   if(!isLoading && isError){
    return <h1>Something went wrong</h1>
   }
};

export default PrivacyPolicy;