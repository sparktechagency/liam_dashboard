import totalUser from '../../assets/dashboard/total-user.png'
import totalIncome from '../../assets/dashboard/total-income.png'
import goldUser from '../../assets/dashboard/gold-user.png'
import platinumUser from '../../assets/dashboard/platinum-user.png'
import daimondUser from '../../assets/dashboard/daimond-user.png'
import DailyServiceChart from '../../components/PagesComponents/Dashboard/DailyServiceChart'
import MostUsingServicePie from '../../components/PagesComponents/Dashboard/MostUsingServicePie'
import ContractorRequest from '../../components/PagesComponents/Dashboard/ContractorRequest'

const Dashboard = () => {
    return (
        <div className=' min-h-[100vh]'>
            <div className=' grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 '>

                <div className='bg-[#fefefe] rounded-lg px-8 py-5 text-center shadow-md'>
                    <h2 className=' mb-3 text-xl font-semibold text-[#4E4E4E]'>Total User</h2>
                    <img className=' mx-auto mb-3 w-12' src={totalUser} alt="user" />
                    <h2 className='text-2xl font-semibold text-[#4E4E4E]'>852,650</h2>
                </div>

                <div className='bg-[#fefefe] rounded-lg px-8 py-5 text-center shadow-md'>
                    <h2 className=' mb-3 text-xl font-semibold text-[#4E4E4E]'>Income</h2>
                    <img className=' mx-auto mb-3 w-12' src={totalIncome} alt="user" />
                    <h2 className='text-2xl font-semibold text-[#4E4E4E]'>$82650</h2>
                </div>

                <div className='bg-[#fefefe] rounded-lg px-8 py-5 text-center shadow-md'>
                    <h2 className=' mb-3 text-xl font-semibold text-[#4E4E4E]'>Gold User</h2>
                    <img className=' mx-auto mb-3 w-12' src={goldUser} alt="user" />
                    <h2 className='text-2xl font-semibold text-[#4E4E4E]'>852,650</h2>
                </div>

                <div className='bg-[#fefefe] rounded-lg px-8 py-5 text-center shadow-md'>
                    <h2 className=' mb-3 text-xl font-semibold text-[#4E4E4E]'>Total User</h2>
                    <img className=' mx-auto mb-3 w-12' src={platinumUser} alt="user" />
                    <h2 className='text-2xl font-semibold text-[#4E4E4E]'>252,650</h2>
                </div>

                <div className='bg-[#fefefe] rounded-lg px-8 py-5 text-center shadow-md'>
                    <h2 className=' mb-3 text-xl font-semibold text-[#4E4E4E]'>Diamond User </h2>
                    <img className=' mx-auto mb-3 w-12' src={daimondUser} alt="user" />
                    <h2 className='text-2xl font-semibold text-[#4E4E4E]'>22,650</h2>
                </div>

            </div>
            <div className=' grid lg:grid-cols-2 gap-8 mt-5' >
                <div className=' bg-white px-5 py-4 rounded-lg'>
                    <h2 className=' mb-4 text-2xl font-semibold text-primaryColor'>Daily Service</h2>
                    <DailyServiceChart></DailyServiceChart>
                </div>
                <div className=' bg-white px-5 py-4 rounded-lg'>
                    <h2 className=' mb-4 text-2xl font-semibold text-primaryColor'>Most Using Services</h2>
                    <div className=' flex justify-center gap-8 items-center mb-4 '>
                        <div className=' '>
                            <div className=' flex items-center gap-2 mb-3'>
                                <div className='bg-[#380538] w-12 h-4'> </div>
                                <p>Elecetric</p>
                            </div>
                            <div className=' flex items-center gap-2'>
                                <div className='bg-[#550855] w-12 h-4'> </div>
                                <p>Plumber</p>
                            </div>
                        </div>
                        <div>
                            <div className=' flex items-center gap-2 mb-3'>
                                <div className='bg-[#8F538F] w-12 h-4'> </div>
                                <p>Cleaner</p>
                            </div>
                            <div className=' flex items-center gap-2'>
                                <div className='bg-[#CDB3CD] w-12 h-4'> </div>
                                <p>Painter</p>
                            </div>
                        </div>

                    </div>
                    <MostUsingServicePie></MostUsingServicePie>
                </div>

            </div>

            <div>
                <ContractorRequest></ContractorRequest>
            </div>

        </div>
    );
};

export default Dashboard;