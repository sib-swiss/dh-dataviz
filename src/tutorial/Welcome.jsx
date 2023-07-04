import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { IoMdCheckboxOutline, IoMdSquareOutline } from 'react-icons/io';

import { BEEN_HERE_TOKEN } from './Tutorial';

const Welcome = props => {

  const [ checked, setChecked ] = useState(false);

  const logos = props.logos;

  const listLogos = logos.map(logo =>
    <img src={logo.path} key={logo.name} />
  );

  const toggleDoNotShow = () => {
    if (checked)
      localStorage.removeItem(BEEN_HERE_TOKEN);
    else 
      localStorage.setItem(BEEN_HERE_TOKEN, true);
    
    setChecked(!checked);
  }

  return ReactDOM.createPortal(
    <div className="p6o-welcome-wrapper">
      <div className="p6o-welcome">
        <h1>Welcome!</h1>

        {props.message.intro &&
          <p className="p6o-welcome-intro" dangerouslySetInnerHTML={{__html: props.message.intro}}></p>
        }
        {props.message.intro &&
          <p dangerouslySetInnerHTML={{__html: props.message.paragraph}}></p>
        }
        
        <div className="p6o-welcome-buttons">
          <label>
            <input 
              type="checkbox" 
              checked={checked} 
              onChange={toggleDoNotShow} />

            { checked ? <IoMdCheckboxOutline /> : <IoMdSquareOutline /> }

            <span>Don't ask again</span>
          </label>
          
          <button 
            className="p6o-no-thanks"
            onClick={props.onNoThanks}>
            No thanks
          </button>

          <button 
            className="p6o-take-tour"
            onClick={props.onTakeTour}>
            Yes, take the tour
          </button>
        </div>

        <div className="p6o-welcome-logos">
          {listLogos}
        </div>
      </div>
    </div>,

    document.body
  );

}

export default Welcome;
