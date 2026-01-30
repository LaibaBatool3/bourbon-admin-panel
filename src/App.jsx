import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layout/Layout'
import Dashboard from './pages/Dashboard'
import MemberManagement from './pages/MemberManagement'
import WhiskeyManagement from './pages/WhiskeyManagement'
import StaffManagement from './pages/StaffManagement'
import Placeholder from './pages/Placeholder'

function App() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="member-management" element={<MemberManagement />} />
          <Route path="whiskey-management" element={<WhiskeyManagement />} />
          <Route path="staff-management" element={<StaffManagement />} />
          <Route path="*" element={<Placeholder />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
