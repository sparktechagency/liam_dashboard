/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin, Phone, Mail, Star, DollarSign } from "lucide-react"
import ContractorApprovalModal from "../modal/contractor/ContractorApprovalModal"


const ContractorHeader = ({ data }: any) => {


  return (
    <div className="border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">{data.fullName}</h1>
              <ContractorApprovalModal status={data?.adminAccept} userId={data?._id}/>
            </div>
         

            <div className="space-y-2 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{data.contractor.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{data.contactNo}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{data.email}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div
                className={`px-3 py-1 rounded-full text-md font-semibold border "bg-emerald-100 text-emerald-800 border-emerald-300`}
              >
                {data.contractor.subscriptionStatus}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:text-right">
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Hourly Rate</div>
              <div className="text-3xl font-bold text-foreground flex items-center gap-2 md:justify-end">
                <DollarSign className="w-6 h-6" />
                {data.contractor.rateHourly}
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Rating</div>
              <div className="text-3xl font-bold text-foreground flex items-center gap-2 md:justify-end">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                {data.contractor.ratings || "N/A"}
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Balance</div>
              <div className="text-3xl font-bold text-foreground">${data.contractor.balance}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ContractorHeader;