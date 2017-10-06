import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import StoryRouter from 'storybook-router'

import ShortProfile from '../Sidebar/ShortProfile'
import ItemMenuSidebar from '../Sidebar/MenuSidebar/ItemMenuSidebar'
import MenuSidebar from '../Sidebar/MenuSidebar'
import Sidebar from '../Sidebar'

import Identicon from '../Identicon'
import Icon from '../Icon'
import SearchBar from '../SearchBar'

import '../bootstrap/index.css'

/** *************** Icon *****************/

storiesOf('Icon', module)
  .add(
    'Icon with name=Disputes, theme=dark',
    () => <Icon
      name='Disputes'
      theme='dark' />
  )

/** *************** Identicon *****************/

storiesOf('Identicon', module)
  .add('default (50x50)', () => <Identicon />)
  .add(
    'small format (24x24)',
    () => <Identicon size={8} scale={3} width={24} height={24} />
  )

/** *************** ShortProfile *****************/

storiesOf('ShortProfile', module)
  .add('default', () => <ShortProfile />)
  .add(
    'with icon, username and balance',
    () => <ShortProfile
      address='John'
      balancePNK={242}
      icon={<Identicon />} />
  )
  .add(
    'with dark background, icon, address and balance',
    () => <ShortProfile
      theme='dark'
      address='John'
      balancePNK={242}
      icon={<Identicon />} />
  )
  .add(
    'with dark background, icon, address, balance and active notification',
    () => <ShortProfile
      theme='dark'
      address='John'
      balancePNK={242}
      notificationIsActive
      icon={<Identicon />} />
  )

/** *************** ItemMenuSidebar *****************/

storiesOf('ItemMenuSidebar', module)
  .addDecorator(StoryRouter())

/** *************** MenuSidebar *****************/

storiesOf('MenuSidebar', module)
  .addDecorator(StoryRouter())
  .add(
    'default',
    () => <MenuSidebar />
  )
  .add(
    'with items=Disputes,Contracts',
    () => <MenuSidebar
      items={['Disputes', 'Contracts']} />
  )

/** *************** Sidebar *****************/

storiesOf('Sidebar', module)
  .addDecorator(StoryRouter())
  .add(
    'with items=Disputes, Contracts, Jury',
    () =>
      <Sidebar
        address={0xA1E4380A3B1f749673E270229993eE55F35663b4}
        balancePNK={242}
        items={['Disputes', 'Contracts', 'Jury']} />
  )

  /** *************** SearchBar *****************/

storiesOf('SearchBar', module)
    .add(
      'default',
      () =>
        <SearchBar />
    )
