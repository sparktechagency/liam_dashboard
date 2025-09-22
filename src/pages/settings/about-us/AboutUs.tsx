import PolicyLoading from "../../../components/loader/PolicyLoading";
import UpdateAboutForm from "../../../components/policy/UpdateAboutForm";
import { useGetAboutQuery } from "../../../redux/features/policy/policyApi";

const AboutUs = () => {
   const {data, isLoading, isError} = useGetAboutQuery(undefined);

   if(isLoading){
     return <PolicyLoading/>
   }

   if(!isLoading && !isError && data){
    return <UpdateAboutForm description={data?.data?.description}/>
   }

   if(!isLoading && isError){
    return <h1>Something went wrong</h1>
   }
};

export default AboutUs;