import CustomUserProfile from '../../../components/shared/UserProfile/CustomUserProfile';
import CustomCard from '../../../components/shared/Card/CustomCard';
import './dashboard-style.css';
import MultiLineChart from '../../../components/shared/Chart/CustomMultiLineChart';
import PieChart from '../../../components/shared/Chart/CustomPieChart';
import useDecodedUser from '../../../services/hooks/useDecodedUser';



export default function DashboardLayout({dashboardTitle,firstRow,secondRow, secondTitle='General Summary'}) {
    const  decodedUser  = useDecodedUser();
	return (
		<div className='container1'>
			{/**user profile */}
            <CustomUserProfile isOnline={'yes'}/>
            
            <div className='dashboard-container'>
                {/** 1 empty row */}
                <div className='grid-empty1'/>
                {/**Welcome message */}
                    <div className='dashboard-title'>{dashboardTitle} Dashboard</div>
                    <div className='dashboard-welcome'>Welcome back, {decodedUser && decodedUser.full_name}</div>
                {/** 2 empty row */}
                <div className='grid-empty2'/>
                {/**FIRST CONTENT */}
                    {firstRow}
                {/** 3 empty row */}
                <div className='grid-empty3'/>
                {/**Second row title */}
                <div className='grid-second-title'>{secondTitle}</div>

                {/**SECOND CONTENT */}
                    {secondRow}
                {/** 4 empty row */}
                
            </div>
		</div>
	);

}