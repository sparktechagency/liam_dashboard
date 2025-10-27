
const RecentContractorLoading = () => {
    const loadingArray = [1,2,3,4, 5];
    
    return (
      <>
        <div className="bg-white p-3 shadow-md rounded-md">
          <div className="flex flex-col gap-6 animate-pulse">
            {loadingArray?.map((item) => (
                <div
                  key={item}
                  className="bg-gray-300 h-10 text-white font-bold py-2 px-4 rounded-md"
                ></div>
            ))}
          </div>
        </div>
      </>
    );
};

export default RecentContractorLoading;