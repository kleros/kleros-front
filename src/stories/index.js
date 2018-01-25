import React from 'react'

import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-router'
import { Provider } from 'react-redux'
import store from '../bootstrap/store'

import Sidebar from '../Components/Sidebar'
import ShortProfile from '../Components/Sidebar/ShortProfile'
import MenuSidebar from '../Components/Sidebar/MenuSidebar'
import ItemMenuSidebar from '../Components/Sidebar/MenuSidebar/ItemMenuSidebar'

import Identicon from '../Components/Identicon'
import Icon from '../Components/Icon'
import SearchBar from '../Components/SearchBar'

import Input from '../Components/Input'
import TruncatedTextBox from '../Components/TruncatedTextBox'
import Grid from '../Components/ContractsTable/Grid'

import Banner from '../Components/Banner'
import MetroCard from '../Components/Home/MetroCard'

import '../bootstrap/index.css'
import {GridContent} from '../Components/DisputesTable/GridContent'

/** *************** Icon *****************/

storiesOf('Icon', module).add('Icon with name=Disputes, theme=dark', () => (
  <Icon name='Disputes' theme='dark' />
))

/** *************** Identicon *****************/

storiesOf('Identicon', module)
  .add('default (50x50)', () => <Identicon />)
  .add('small format (24x24)', () => (
    <Identicon size={8} scale={3} width={24} height={24} />
  ))

/** *************** ShortProfile *****************/

storiesOf('ShortProfile', module)
  .add('default', () => <ShortProfile />)
  .add('with icon, username and balance', () => (
    <ShortProfile
      address='0x5DF9B87991262F6BA471F09758CDE1c0FC1De734'
      balancePNK={242}
      icon={<Identicon />}
    />
  ))
  .add('with dark background, icon, address and balance', () => (
    <ShortProfile
      theme='dark'
      address='0x5DF9B87991262F6BA471F09758CDE1c0FC1De734'
      balancePNK={242}
      icon={<Identicon />}
    />
  ))
  .add(
    'with dark background, icon, address, balance and active notification',
    () => (
      <ShortProfile
        theme='dark'
        address='0x5DF9B87991262F6BA471F09758CDE1c0FC1De734'
        balancePNK={242}
        notificationIsActive
        icon={<Identicon />}
      />
    )
  )

/** *************** ItemMenuSidebar *****************/

storiesOf('ItemMenuSidebar', module)
  .addDecorator(StoryRouter())
  .add('default', () => <ItemMenuSidebar />)
  .add('with dark background and name', () => (
    <ItemMenuSidebar name='items' theme='dark' />
  ))

/** *************** MenuSidebar *****************/

storiesOf('MenuSidebar', module)
  .addDecorator(StoryRouter())
  .add('default', () => <MenuSidebar />)
  .add('with items=Disputes,Contracts', () => (
    <MenuSidebar items={['Disputes', 'Contracts']} />
  ))

/** *************** Sidebar *****************/

storiesOf('Sidebar', module)
  .addDecorator(StoryRouter())
  .addDecorator(setStoryStore => (
    <Provider store={store}>{setStoryStore()}</Provider>
  ))
  .add('with items=Disputes, Contracts, Jury', () => (
    <Sidebar
      address='0xa1e4380a3b1f749673e270229993ee55f35663b4'
      balancePNK={242}
      items={['Disputes', 'Contracts', 'Jury']}
    />
  ))
  .add('with account locked', () => <Sidebar />)

/** *************** SearchBar *****************/

storiesOf('SearchBar', module).add('default', () => <SearchBar />)

/** ************** Input ********************/

storiesOf('Input', module)
  .add('default', () => <Input />)
  .add('input text type with placeholder', () => (
    <Input type='text' placeholder='Add your name here' />
  ))
  .add('textarea with placeholder', () => (
    <Input type='textarea' placeholder='Add your comments' />
  ))
  .add('radio button', () => <Input type='radio' />)
  .add('file input type with placeholder', () => (
    <Input type='file' placeholder='Browse file' />
  ))

/** *************** TruncatedTextBox *****************/

storiesOf('TruncatedTextBox', module)
  .add('default', () => <TruncatedTextBox />)
  .add('with text and truncatedCharacters=4', () => (
    <TruncatedTextBox
      text='with text length is greater than/equal to truncatedCharacters'
      truncatedCharacters={4}
    />
  ))
  .add('with text length less than truncatedCharacter=8', () => (
    <TruncatedTextBox
      text='with text length is less than truncatedCharacters'
      truncatedCharacters={8}
    />
  ))

/** *************** DisputesTable ****************/

storiesOf('DisputesTable', module)
  .add('with pagination', () => {
    let disputes = []
    for (let cnt = 1; cnt <= 1000; cnt += 1) {
      disputes.push({
        arbitratorAddress: process.env.REACT_APP_ARBITRATOR_ADDRESS,
        arbitrableContractAddress: cnt,
        description: 'Case ' + cnt,
        hash: cnt + '',
        arbitrableContractStatus: cnt % 5,
        category: 'Freelance',
        deadline: 'Tomorrow',
        partyA: 'abcdefghijklm',
        partyB: 'nopqrstuvwxyz'
      })
    }

    let props = {
      hasErrored: false,
      isFetching: false,
      disputes: disputes,
      getDataDisputes: () => {

      },
      hasPagination: true,
      baseLink: 'disputes',
      filter: () => true,
      filterFunction: (disputes) => disputes,
      Link: (props) => (<a href='#/{props.to}'>{props.children}</a>)
    }
    let className
    return (
      <div className={`Grid-container ${className}`}>
        <div className='grid'>
          <div className='header'>
            <div className='item header-project-item'>Project</div>
            <div className='item header-deadline-item'>Deadline</div>
            <div className='item header-case_id-item'>Case ID</div>
            <div className='item header-status-item'>Status</div>
          </div>
          <GridContent {...props} />
        </div>
      </div>
    )
  }
  )
/** *************** Grid ****************/

storiesOf('Grid', module)
  .add('default', () => <Grid />)
  .add('with input text and icon', () => (
    <Grid>
      <Input type='text' placeholder='Type something here' />
      <Icon name='Disputes' theme='dark' />
    </Grid>
  ))

/** *************** Banner ****************/

storiesOf('Banner', module)
  .addDecorator(StoryRouter())
  .add('default', () => <Banner title='Banner Title' linkTo='/example' />)

/** *************** MetroCard ****************/

storiesOf('MetroCard', module)
  .addDecorator(StoryRouter())
  .addDecorator(setStoryStore => (
    <Provider store={store}>{setStoryStore()}</Provider>
  ))
  .add('default', () => <MetroCard />)
