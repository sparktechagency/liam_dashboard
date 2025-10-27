import { useParams } from "react-router-dom"
import CertificatesSection from "../../components/ContractorDetail/CertificatesSection"
import ContractorInfo from "../../components/ContractorDetail/ContractorInfo"
import ContractorHeader from "../../components/ContractorDetail/ContratorHeader"
import MaterialsSection from "../../components/ContractorDetail/MaterialsSection"
import SkillsSection from "../../components/ContractorDetail/SkillsSection"
import ContractorApprovalModal from "../../components/modal/contractor/ContractorApprovalModal"
import { useGetSingleContractorQuery } from "../../redux/features/contractor/contractorApi"
import { TApprovalStatus } from "../../types/contractor.type";
import SingleContractorLoading from "../../components/loader/SingleContractorLoading"

//   const contractorData = {
//   adminAccept: "pending",
//   _id: "68fdcb2f4dbf9a00eb73ac07",
//   fullName: "2 shaon",
//   email: "joves21354@dwakm.com",
//   contactNo: "123456789",
//   img: "",
//   contractor: {
//     _id: "68fdcb2f4dbf9a00eb73ac05",
//     location: "651 Belvedere St, San Francisco, CA 94117, USA",
//     rateHourly: 2,
//     balance: 0,
//     ratings: 0,
//     subscriptionStatus: "inactive",
//     certificates: [
//       // "https://servana-bucket.s3.ap-southeast-2.amazonaws.com/1761463132907_file-sample_150kB.pdf",
//       // "https://servana-bucket.s3.ap-southeast-2.amazonaws.com/1761463133861_file-sample_150kB.pdf",
//       // "https://servana-bucket.s3.ap-southeast-2.amazonaws.com/1761463134801_file-sample_150kB.pdf",
//     ],
//     // certificates: [
//     //   "https://servana-bucket.s3.ap-southeast-2.amazonaws.com/1761463132907_file-sample_150kB.pdf",
//     //   "https://servana-bucket.s3.ap-southeast-2.amazonaws.com/1761463133861_file-sample_150kB.pdf",
//     //   "https://servana-bucket.s3.ap-southeast-2.amazonaws.com/1761463134801_file-sample_150kB.pdf",
//     // ],
//     skills: ["skill1", "skill2", "skill3"],
//     materials: [
//       {
//         name: "a",
//         unit: "feet",
//         price: 23,
//         _id: "68fdcb704dbf9a00eb73ac40",
//       },
//     ],
//   },
// }


const ContractorDetailsPage = () => {
  const { id } = useParams();
  console.log(id)
  const { data, isLoading, isError } = useGetSingleContractorQuery(id);
  const contractorData = data?.data || {};

  if(isLoading){
    return <SingleContractorLoading/>
  }

  if(!isLoading && isError){
    return <h1>Something Went Wrong</h1>
  }



  if (!isLoading && !isError && data) {
    return (
      <>
        <h1 className="font-semibold py-2">Contractor Details</h1>
        <main className="min-h-screen bg-[#FAFAFA]">
          <ContractorHeader data={contractorData} />
          <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <ContractorInfo data={contractorData} />
                <SkillsSection skills={contractorData.contractor.skills} />
                <MaterialsSection materials={contractorData.contractor.materials} />
              </div>
              <div>
                <CertificatesSection certificates={contractorData.contractor.certificates} />
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto flex items-center gap-3 mb-4 pb-12">
            <h1 className="text-2xl font-bold text-foreground">Change Approval Status:</h1>
            <ContractorApprovalModal status={contractorData?.adminAccept as TApprovalStatus} userId={contractorData?._id} />
          </div>
        </main>
      </>
    )
  }
}

export default ContractorDetailsPage