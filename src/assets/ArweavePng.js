import React from 'react'

const ArweavePng = () => {
	return (
		<img className="icon-frame"  alt="arweave"  src="data:image/png;base64,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" />
	)
}

export default ArweavePng