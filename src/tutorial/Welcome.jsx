import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { IoMdCheckboxOutline, IoMdSquareOutline } from 'react-icons/io';

import { BEEN_HERE_TOKEN } from './Tutorial';

const Welcome = props => {

  const [ checked, setChecked ] = useState(false);

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

        <p className="p6o-welcome-intro">
          Welcome to the <strong>DataViz</strong> of the <a href="https://mark16.sib.swiss/">SNSF MARK16 VRE</a>!
        </p>
        <p>
          You will find here a digital map that locates all the
          manuscript data of <a href="https://mr-mark16.sib.swiss/">MARK16 Manuscript Room</a>.
          It has been created by Elisa Nury and the MARK16 team in partnership with the <a href="https://pelagios.org/">Pelagios network</a>, and 
          uses <a href="https://www.openstreetmap.org/">Open Street Map</a>. The code is available in <a href="https://github.com/sib-swiss/dh-dataviz">github</a> under a GPLv3 license.
        </p>
        
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
          <img src="../../../logos/Pelagios_sm.png"/>
          <img src="../../../logos/SNSF_sm.png"/>
          <img src="../../../logos/SIBlogo_sm.png"/>
          <img src="../../../logos/github-mark-sm.png"/>
        </div>
      </div>
    </div>,

    document.body
  );

}

export default Welcome;
