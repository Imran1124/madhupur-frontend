import PropTypes from 'prop-types';
import { m } from 'framer-motion';
//
import { varContainer } from './variants';

// ----------------------------------------------------------------------

MotionContainer.propTypes = {
  action: PropTypes.bool,
  animate: PropTypes.bool,
  children: PropTypes.node.isRequired,
  once: PropTypes.bool
};

export default function MotionContainer({
  animate,
  action = false,
  children,
  once = true,
  ...other
}) {
  if (action) {
    return (
      <m.div
        initial={false}
        animate={animate ? 'animate' : 'exit'}
        variants={varContainer()}
        className="overflow-hidden"
        {...other}
      >
        {children}
      </m.div>
    );
  }

  return (
    <m.div
      whileInView="animate"
      viewport={{ once, amount: 0.3 }}
      initial="initial"
      variants={varContainer()}
      className="overflow-hidden"
      {...other}
    >
      {children}
    </m.div>
  );
}
