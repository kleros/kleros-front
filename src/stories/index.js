import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import ShortProfile from '../components/ShortProfile'
import Sidebar from '../components/Sidebar'

import Identicon from '../containers/Identicon'

import '../bootstrap/index.css'

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
    'with black background, icon, username and balance',
    () => <ShortProfile
      backgroundColor='dark'
      username='John'
      balancePNK={242}
      icon={<Identicon />} />
  )
  .add(
    'with black background, icon, username, balance and active notification',
    () => <ShortProfile
      backgroundColor='dark'
      username='John'
      balancePNK={242}
      notificationIsActive={true}
      icon={<Identicon />} />
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
