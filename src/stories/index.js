import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import StoryRouter from 'storybook-router'

import ShortProfile from '../components/ShortProfile'
import ItemMenuSidebar from '../components/ItemMenuSidebar'
import MenuSidebar from '../components/MenuSidebar'
import Sidebar from '../components/Sidebar'

import Identicon from '../containers/Identicon'
import Icon from '../containers/Icon'
import SearchBar from '../containers/SearchBar'

import '../bootstrap/index.css'

/***************** Icon *****************/

storiesOf('Icon', module)
  .add(
    'Icon with name=Disputes, theme=dark',
    () => <Icon
      name='Disputes'
      theme='dark' />
  )

/***************** Identicon *****************/

storiesOf('Identicon', module)
  .add('default (50x50)', () => <Identicon />)
  .add(
    'small format (24x24)',
    () => <Identicon size={8} scale={3} width={24} height={24} />
  )

/***************** ShortProfile *****************/

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
      notificationIsActive
      icon={<Identicon />} />
  )

/***************** ItemMenuSidebar *****************/

storiesOf('ItemMenuSidebar', module)
  .addDecorator(StoryRouter())

/***************** MenuSidebar *****************/

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

/***************** Sidebar *****************/

storiesOf('Sidebar', module)
  .addDecorator(StoryRouter())
  .add(
    'with items=Disputes, Contracts, Jury',
    () =>
      <Sidebar identicon={
        <ShortProfile
          backgroundColor='dark'
          username='John'
          balancePNK={242}
          notificationIsActive
          icon={<Identicon seed='0xA1E4380A3B1f749673E270229993eE55F35663b4' />} />
        }
      >
        <MenuSidebar
          items={['Disputes', 'Contracts', 'Jury']} />
      </Sidebar>
  )

  /***************** SearchBar *****************/

  storiesOf('SearchBar', module)
    .add(
      'default',
      () =>
        <SearchBar />
    )
