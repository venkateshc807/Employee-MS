import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import { AuthProvider } from './context/authContext'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBasedRoutes from './utils/RoleBasedRoutes'
import Unauthorized from './pages/unAuthorized'
import AdminSummary from './components/dashboard/AdminSummary'
import DepartmentList from './components/departments/DepartmentList'
import AddDepartment from './components/departments/AddDepartment'
import EditDepartment from './components/departments/EditDepartment'
import EmployeList from './components/employee/EmployeList'
import AddEmploye from './components/employee/AddEmploye'
import ViewEmployee from './components/employee/ViewEmployee'
import EditEmployee from './components/employee/EditEmployee'
import AddSalary from './components/salary/AddSalary'
import ViewSalary from './components/salary/ViewSalary'
import EmployeeDashboard from './pages/EmployeeDashboard'
import EmployeeSummaryCard from './components/employeedashboard/EmployeeSummaryCard'
import LeaveList from './components/leave/LeaveList'
import AddLeave from './components/leave/AddLeave'
import EmployeeSetting from './components/employeedashboard/EmployeeSetting'
import Table from './components/leave/Table'
import LeaveDetail from './components/leave/LeaveDetail'
import Attendance from './components/attandance/Attendance'
import AttendanceReport from './components/attandance/AttendanceReport'



function App() {
 
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Navigate to="/admin-dashboard" />} />
          <Route path='/login' element={<Login />} />
          
          <Route
            path='/admin-dashboard'
            element={
              <PrivateRoutes>
                <RoleBasedRoutes requiredRole={["admin"]}>
                  <AdminDashboard />
                </RoleBasedRoutes>
              </PrivateRoutes>
            }>


              <Route index element={<AdminSummary/>}/>
              <Route path='/admin-dashboard/departments' element={<DepartmentList/>}/>
              <Route path='/admin-dashboard/add-department' element={<AddDepartment/>}/>
              <Route path='/admin-dashboard/department/:id' element={<EditDepartment/>}/>



              <Route path='/admin-dashboard/employees' element={<EmployeList/>}/>
              <Route path='/admin-dashboard/add-employee' element={<AddEmploye/>}/>
              <Route path='/admin-dashboard/employees/:id' element={<ViewEmployee/>}/>
              <Route path='/admin-dashboard/employees/edit/:id' element={<EditEmployee/>}/>



              <Route path='/admin-dashboard/employees/salary/:id' element={<ViewSalary/>}/>
              <Route path='/admin-dashboard/salary/add' element={<AddSalary/>}/>
              <Route path='/admin-dashboard/attendance' element={<Attendance/>}/>
              <Route path='/admin-dashboard/attendance-report' element={<AttendanceReport/>}/>




              <Route path='/admin-dashboard/leaves' element={<Table/>}/>
              <Route path='/admin-dashboard/leaves/:id' element={<LeaveDetail/>}/>
              <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList/>}/>
             
             
             
              <Route path="/admin-dashboard/setting" element={<EmployeeSetting/>}/>
            
            
            </Route>

            <Route 
            path='/employee-dashboard'
            element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={['admin', "employee"]}>
              <EmployeeDashboard/>
              </RoleBasedRoutes>
            </PrivateRoutes>
}>

            <Route index element={<EmployeeSummaryCard/>}/> 

            <Route path='/employee-dashboard/profile/:id' element={<ViewEmployee/>}/>
            <Route path='/employee-dashboard/leaves/:id' element={<LeaveList/>}/>
            <Route path='/employee-dashboard/add-leave' element={<AddLeave/>}/>
            <Route path='/employee-dashboard/salary/:id' element={<ViewSalary/>}/>
            <Route path='/employee-dashboard/setting' element={<EmployeeSetting/>}/>

            </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

