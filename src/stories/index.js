import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import ShortProfile from '../components/ShortProfile'
import ItemMenuSidebar from '../components/ItemMenuSidebar'
import Sidebar from '../components/Sidebar'

import Identicon from '../containers/Identicon'
import Icon from '../containers/Icon'

import '../bootstrap/index.css'

storiesOf('Icon', module)
  .add(
    'Icon with name=Disputes, theme=dark',
    () => <Icon
      name='Disputes'
      theme='dark' />
  )

storiesOf('Identicon', module)
  .add('default (50x50)', () => <Identicon />)
  .add(
    'small format (24x24)',
    () => <Identicon size={8} scale={3} width={24} height={24} />
  )

storiesOf('ShortProfile', module)
  .add('default', () => <ShortProfile />)
  .add(
    'with icon, username and balance',
    () => <ShortProfile
      username='John'
      balancePNK={42}
      icon={<Identicon />} />
  )
  .add(
    'with dark background, icon, username and balance',
    () => <ShortProfile
      backgroundColor='dark'
      username='John'
      balancePNK={242}
      icon={<Identicon />} />
  )
  .add(
    'with dark background, icon, username, balance and active notification',
    () => <ShortProfile
      backgroundColor='dark'
      username='John'
      balancePNK={242}
      notificationIsActive={true}
      icon={<Identicon />} />
  )

storiesOf('ItemMenuSidebar', module)
  .add(
    'default',
    () => <ItemMenuSidebar />
  )
  .add(
    'with dark background, icon and title',
    () => <ItemMenuSidebar
      backgroundColor='dark'
      name='Disputes'
      title='Disputes' />
  )

  storiesOf('Sidebar', module)
    .add(
      'default',
      () =>
        <Sidebar identicon=
          {
            <ShortProfile
              backgroundColor='dark'
              username='John'
              balancePNK={242}
              notificationIsActive={true}
              icon={<Identicon seed='0xA1E4380A3B1f749673E270229993eE55F35663b4' />} />
          }
        />
    )
