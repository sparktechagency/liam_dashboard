import totalUser from '../../assets/dashboard/total-user.png'
import totalIncome from '../../assets/dashboard/total-income.png'
import platinumUser from '../../assets/dashboard/platinum-user.png'
import daimondUser from '../../assets/dashboard/daimond-user.png'
import { TDashboardStats } from '../../types/dashboard.type'

type TProps = {
    states: TDashboardStats
}

const Dashboard = ({ states }: TProps) => {

    return (
        <>
            <div className=' grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 '>

                <div className='bg-[#fefefe] rounded-lg px-8 py-5 text-center shadow-md'>
                    <h2 className=' mb-3 text-xl font-semibold text-[#4E4E4E]'>Total Customer</h2>
                    <img className=' mx-auto mb-3 w-12' src={totalUser} alt="user" />
                    <h2 className='text-2xl font-semibold text-[#4E4E4E]'>{states?.totalCustomer}</h2>
                </div>
                <div className='bg-[#fefefe] rounded-lg px-8 py-5 text-center shadow-md'>
                    <h2 className=' mb-3 text-xl font-semibold text-[#4E4E4E]'>Total Contractor</h2>
                    <img className=' mx-auto mb-3 w-12' src={totalUser} alt="user" />
                    <h2 className='text-2xl font-semibold text-[#4E4E4E]'>{states?.totalContractor}</h2>
                </div>
                <div className='bg-[#fefefe] rounded-lg px-8 py-5 text-center shadow-md'>
                    <h2 className=' mb-3 text-xl font-semibold text-[#4E4E4E]'>Total Income</h2>
                    <img className=' mx-auto mb-3 w-12' src={totalIncome} alt="user" />
                    <h2 className='text-2xl font-semibold text-[#4E4E4E]'>${states?.totalIncome}</h2>
                </div>
                <div className='bg-[#fefefe] rounded-lg px-8 py-5 text-center shadow-md'>
                    <h2 className=' mb-3 text-xl font-semibold text-[#4E4E4E]'>Total Booking</h2>
                    <img className=' mx-auto mb-3 w-12' src={platinumUser} alt="user" />
                    <h2 className='text-2xl font-semibold text-[#4E4E4E]'>{states?.totalBooking}</h2>
                </div>
                <div className='bg-[#fefefe] rounded-lg px-8 py-5 text-center shadow-md'>
                    <h2 className=' mb-3 text-xl font-semibold text-[#4E4E4E]'>Total Active Booking</h2>
                    <img className=' mx-auto mb-3 w-12' src={daimondUser} alt="user" />
                    <h2 className='text-2xl font-semibold text-[#4E4E4E]'>{states?.totalActiveBooking}</h2>
                </div>
            </div>
        </>

    );
};

export default Dashboard;