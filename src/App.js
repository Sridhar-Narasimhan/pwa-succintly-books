import React, { Component } from 'react';
import {TextBoxComponent} from '@syncfusion/ej2-react-inputs';
import './App.css';
import * as ReactDOM from 'react-dom';
import { cardBook } from './datasource';
import { Query, DataManager, Predicate } from '@syncfusion/ej2-data';
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-layouts/styles/material.css";
import "bootstrap/dist/css/bootstrap.min.css";

let cardEle;
let data = [];
let emptyData = true;
/* Funtion for Rendering Cards */
function cardRendering(cardBook) {
let errorContent = document.querySelector('.tile_layout .row.error');
if (cardBook.length > 0) {
errorContent.style.display = 'none';
cardBook.forEach((data, index) => {
cardEle = document.getElementById('card_sample_' + (++index));
if (cardEle) {
ReactDOM.render(<CardRender data={data}/>, cardEle);
}
});
}
else {
errorContent.style.display = 'flex';
}
}
/* Funtion for Destroying Cards */
function destroyAllCard() {
  let cards = document.querySelectorAll('.card-control-section .e-card');
  [].slice.call(cards).forEach((el) => {
  ReactDOM.unmountComponentAtNode(el.parentElement);
  });
  }
  /* Function for Filtering Cards */
  function searchFilter(key) {
  let predicate = new Predicate('cardContent', 'Contains', key, true);
  predicate = predicate.or('cardImage.title', 'Contains', key, true).or('header_title', 'Contains', key, true).or('header_subtitle', 'Contains', key, true);
  data = new DataManager(cardBook).executeLocal(new Query().where(predicate));
  destroyAllCard();
  cardRendering(data);
  }
  

class App extends Component {
  componentDidMount() {
    cardRendering(cardBook);
    }
    filterHandler(e) {
      if (e.event.code === 'Tab' || e.event.code === 'Escape' || e.event.code === 'ShiftLeft' || (e.event.code === 'Backspace' && emptyData)) {
      return;
      }
      let inputVal = e.value;
      emptyData =inputVal.length === 0 ;
      searchFilter(inputVal);
      }
      
  render() {
  return (
  <div className="App">
  <div className='control-pane'>
  <div>
  {/* Header HTML element */}
  <header className="header">
  <h1 className="header__title">Succintly Series</h1>
  </header>
  </div>
  <div className="main">
  <div className="control-section card-control-section tile_layout">
  <div className="row filter">
  <div className="col-xs-4 col-sm-4 col-lg-4 col-md-4 "></div>
  <div className="col-xs-4 col-sm-4 col-lg-4 col-md-4 ">
  {/* Searching HTML element */}
  <TextBoxComponent id="search_Card" placeholder="Enter text to search" floatLabelType="Auto" input={(event) => this.filterHandler(event)} />
  </div>
  <div className="col-xs-4 col-sm-4 col-lg-4 col-md-4  tile_search">
  </div></div>
  {/* Cards Template holder */}
  <div className='row e-card-layout' style={{ textAlign: 'center' }}>
  <div className="row">
  <div className="row error" style={{ minHeight: '150px' }}>
  <div className="e-error-content" style={{ margin: 'auto', fontWeight: 500 }}>No results found. Please try a different search.</div></div>
  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
  <div id='card_sample_1' className='card_sample'></div></div>
  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
  <div id='card_sample_2' className='card_sample'></div></div>
  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
  <div id='card_sample_3' className='card_sample'></div></div>
  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
  <div id='card_sample_4' className='card_sample'></div></div>
  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
  <div id='card_sample_5' className='card_sample'></div></div>
  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
  <div id='card_sample_6' className='card_sample'></div></div>
  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
  <div id='card_sample_7' className='card_sample'></div></div>
  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
  <div id='card_sample_8' className='card_sample'></div></div>
  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
  <div id='card_sample_9' className='card_sample'></div></div>
  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
  <div id='card_sample_10' className='card_sample'></div></div>
  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
  <div id='card_sample_11' className='card_sample'></div></div>
  <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
  <div id='card_sample_12' className='card_sample'></div></div>
  </div></div></div></div></div>
  </div>
  );
  }
  }
  class CardRender extends React.Component {
    constructor() {
    super(...arguments);
    this.headerTitleSubCheck = this.props.data.header_title.length > 0 || this.props.data.header_subtitle.length > 0;
    this.headerCheck = this.props.data.header_title.length > 0 || this.props.data.header_subtitle.length > 0 || this.props.data.header_img.length > 0;
    this.bgimageUrl =  this.props.data.cardImage.url ;
    }
    render() {
    return (<div className={this.props.data.isHorizontal ? 'e-card e-card-horizontal' : 'e-card'}>
    {this.props.data.cardImage && <div className={"e-card-image "+this.bgimageUrl} > {this.props.data.cardImage.title && <div className='e-card-title'>{this.props.data.cardImage.title}</div>} </div>}
    {this.props.data.cardTitle && <div className='e-card-title'>{this.props.data.cardTitle}</div>}
    {this.headerCheck &&
    <div className='e-card-header'>
    {this.props.data.header_img && <div className={this.props.data.header_img.isRounded ? 'e-card-header-image e-card-corner' : 'e-card-header-image e-card-corner'}></div>}
    {this.headerTitleSubCheck &&
    <div className='e-card-header-caption'>
    {this.props.data.header_title && <div className='e-card-header-title'>{this.props.data.header_title}</div>}
    {this.props.data.header_subtitle && <div className='e-card-sub-title'>{this.props.data.header_subtitle}</div>}
    </div>}
    </div>}
    {this.props.data.cardContent && <div className='e-card-content'>{this.props.data.cardContent}</div>}
    {this.props.data.card_action_btn &&
    <div className={this.props.data.card_action_btn.isVertical ? 'e-card-actions e-card-vertical' : 'e-card-actions'}>
    {this.props.data.card_action_btn.action_btns.map(function (actBtn) {
    return actBtn.tag === "a" ? <a key={actBtn.text} href={actBtn.href} target={actBtn.target} className='e-btn e-outline e-primary'> {actBtn.text}</a> : <button key={actBtn.text} className='e-card-btn'>{actBtn.text}</button>;
    })}
    </div>}
    </div>);
    }
    }
    
export default App;
