import React from 'react'
import Sidebar from '../Sidebar'
import ShortProfile from '../ShortProfile'
import MenuSidebar from '../MenuSidebar'
import Identicon from '../../containers/Identicon'
import Icon from '../../containers/Icon'
import './Layout.css'

const Layout = ({
  className,
  children,
  ...rest
}) => (
  <div className={`Layout-container ${className}`}>
    <Sidebar identicon={
      <ShortProfile
        backgroundColor='dark'
        username='John'
        balancePNK={242}
        notificationIsActive
        icon={<Identicon seed='0xA1E4380A3B1f749673E270229993eE55F35663b4' />} />
      }
    >
      <MenuSidebar items={[
        'Disputes',
        'Contracts',
        'Jury',
        'Decisions',
        'Settings'
      ]} />
    </Sidebar>
    { children }
  </div>
)

export default Layout
