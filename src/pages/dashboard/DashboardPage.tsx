import { useGetStatsQuery } from '../../redux/features/dashboard/dashboardApi'
import DashboardLoading from '../../components/loader/DashboardLoading'
import Dashboard from '../../components/dashboard/Dashboard'

const DashboardPage = () => {
    const { data, isLoading, isError} = useGetStatsQuery(undefined);
    const states = data?.data || {};

    if(isLoading){
       return <DashboardLoading/>
    }

    if(!isLoading && !isError && states){
        return <Dashboard states={states}/>
    }

    if(!isLoading && isError){
        return <h1>Something Went Wrong</h1>
    }

   
};

export default DashboardPage;