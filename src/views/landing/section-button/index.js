import React from 'react'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from '@reach/router'

import useStyles from './styles'

const SectionButton = ({ label, img, color }) => {
  const styles = useStyles()
  return (
    <Link to={`/${label === 'decoração' ? 'decoracao' : label}`} className={styles.section}>
      <img alt="Seção da comida" aria-hidden="true" className={styles.img} src={img} />
      <Typography className={classnames(styles.button, styles[color])} component="h1" variant="h2">
        {label}
      </Typography>
    </Link>
  )
}

SectionButton.propTypes = {
  label: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default React.memo(SectionButton)
