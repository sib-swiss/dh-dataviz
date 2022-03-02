import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlinePlusCircle } from 'react-icons/hi';

import { SIGNATURE_COLOR } from '../../Colors';

const parentAnimation = {
  hidden: { 
    opacity: 0,
    transition: {
      staggerChildren: 0.05
    }
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const childAnimation = {
  hidden: { 
    opacity: 0,
    maxWidth: 0 
  },
  visible: { 
    opacity: 1,
    maxWidth: 500,
    transition: {
      duration: 0.5
    }
  }
}

const Facets = props => {

  // Sort facet values by item count
  const values = Object.entries(props.results.getFacetValues(props.facet));
  values.sort((a, b) => b[1].length - a[1].length);

  const displayed = values.slice(0, 8);
  const remaining = values.length - displayed.length;

  return (
    <motion.div 
      key="facets-container"
      className="p6o-facets-container">
      <div className="p6o-facets">
        <motion.div
          className="p6o-facets-carousel"
          variants={parentAnimation}
          initial="hidden"
          animate="visible"
          exit="hidden">

          <button onClick={props.onPreviousFacet}>
            <HiOutlineChevronLeft />
          </button>
          
          <h3>{props.facet}</h3>
          
          <button onClick={props.onNextFacet}>
            <HiOutlineChevronRight />
          </button>
        </motion.div>

        <motion.ul 
          variants={parentAnimation} 
          initial="hidden" 
          animate="visible"
          exit="hidden">

          {displayed.map(([label, results], idx) => 
            <motion.li 
              key={label}
              variants={childAnimation}>
              <div className="p6o-facet-value-wrapper">
                <span 
                  className="p6o-facet-value-count"
                  style={{ backgroundColor: SIGNATURE_COLOR[idx] }}>{results.length.toLocaleString('en')}</span>

                <span className="p6o-facet-value-label">{label}</span>
              </div>
            </motion.li>
          )}

          {remaining > 0 && 
            <motion.li
              key="p6o-remaining"
              variants={childAnimation}
              className="p6o-facet-values-remaining">
              <div className="p6o-facet-value-wrapper">
                <span><HiOutlinePlusCircle /> {remaining} more</span>
              </div>
            </motion.li>
          }
        </motion.ul>

      </div>
    </motion.div>
  )

}

export default Facets;