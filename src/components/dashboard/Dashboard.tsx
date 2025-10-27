import { useGetBookingStatsQuery, useGetDailyBookingsQuery, useGetStatsQuery } from '../../redux/features/dashboard/dashboardApi'
import DashboardLoading from '../../components/loader/DashboardLoading'
import MostUsingServicePie from '../../components/PagesComponents/Dashboard/MostUsingServicePie';
import DailyServiceChart from '../../components/PagesComponents/Dashboard/DailyServiceChart';
import Stats from './Stats';

const Dashboard = () => {
    const { data, isLoading, isError} = useGetStatsQuery(undefined);
    const { data:bookingStatsData, isLoading:bookingLoading} = useGetBookingStatsQuery(undefined);
    const { data: dailyBookingsData, isLoading:dailyLoading} = useGetDailyBookingsQuery(undefined);
    const states = data?.data || {};

    if(isLoading || bookingLoading || dailyLoading){
       return <DashboardLoading/>
    }

    if(!isLoading && !isError && states){
        return (
            <>
              <div>
                  <Stats states={states}/>
                  <div className='grid lg:grid-cols-2 gap-8 mt-5'>
                    <DailyServiceChart data={dailyBookingsData?.data}/>
                    <MostUsingServicePie result={bookingStatsData?.data}/>
                  </div>
              </div>
            </>
        )
    }

    if(!isLoading && isError){
        return <h1>Something Went Wrong</h1>
    }

   
};

export default Dashboard;