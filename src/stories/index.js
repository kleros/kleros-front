import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import ShortProfile from '../components/ShortProfile'

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
