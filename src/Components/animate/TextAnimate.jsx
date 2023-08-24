import PropTypes from 'prop-types';
import { m } from 'framer-motion';

//
import { varFade } from './variants';

// ----------------------------------------------------------------------

TextAnimate.propTypes = {
  text: PropTypes.string.isRequired,
  variants: PropTypes.object
};

export default function TextAnimate({ text, variants, ...other }) {
  return (
    <m.div className="inline-flex overflow-hidden " {...other}>
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </m.div>
  );
}
