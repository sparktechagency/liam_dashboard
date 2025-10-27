/* eslint-disable @typescript-eslint/no-explicit-any */

const ContractorInfo = ({ data }: any) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
      <div className="bg-card border border-[#E5E5E5] rounded-lg p-6 bg-white space-y-3">
        <div>
            <h1>Location:</h1>
            <span>{data?.contractor?.location}</span>
        </div>
        <div className="flex items-center gap-3">
            <h1>Hourly Rate:</h1>
            <p className="text-lg">${data?.contractor?.rateHourly}</p>
        </div>
      </div>
    </section>
  )
}


export default ContractorInfo;