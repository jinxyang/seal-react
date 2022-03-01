import React from 'react'

import Portal from '../Portal'
import Toast from '../Toast'

const PortalToasts = ({ list = [], onClose = () => {} }) => {
  return (
    <Portal show={list.some(({ show }) => show)}>
      {list.map(({ id, ...props }) => (
        <Toast {...props} key={id} onClose={() => onClose(id)} />
      ))}
    </Portal>
  )
}

export default PortalToasts
