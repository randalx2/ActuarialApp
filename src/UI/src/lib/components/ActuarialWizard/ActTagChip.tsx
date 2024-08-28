import { Chip, ChipProps, makeStyles, Theme, Tooltip } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'


type ActTagChipProps = ChipProps &
  {
    /**
     * Set to true to style the tag as an RTP value
     */
    isRtp?: boolean
    /**
     * Force pointer cursor for when tag is in a hover / click area
     */
    cursor?: 'pointer'
    /**
     * Set custom tooltip
     */
    tooltip?: NonNullable<React.ReactNode>
    /**
     * Set maxWidth for rtp label
     */
    labelMaxWidth?: string | number
  }

const useStyles = makeStyles<Theme, Pick<ActTagChipProps, 'isRtp' | 'cursor' | 'labelMaxWidth'>>(
  theme => {
    const rtpBackgroundColor = theme.palette.type === 'light' ? '#f3d378' : '#cb9a2d'
    const labelOpacity = theme.palette.type === 'light' ? 0.85 : 0.7
    const labelWeight = theme.palette.type === 'light' ? 400 : 500

    return {
      chip: {
        borderRadius: '5px',
        cursor: p => p.cursor
      },
      rtpChip: {
        backgroundColor: rtpBackgroundColor,
        color: theme.palette.getContrastText(rtpBackgroundColor),
        '&:hover, &:focus': {
          backgroundColor: rtpBackgroundColor
        }
      },
      label: {
        opacity: labelOpacity,
        fontWeight: labelWeight,
        fontSize: '0.6875rem', // 11px
        lineHeight: '0.875rem' // 14px
      },
      avatar: {
        color: p =>
          p.isRtp ? `${theme.palette.getContrastText(rtpBackgroundColor)} !important` : undefined,
        transform: 'scale(0.85)',
        opacity: labelOpacity,
        lineHeight: '0.875rem' // 14px
      },
      labelDiv: {
        maxWidth: p => p.labelMaxWidth,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }
  }
)

const ActTagChip = (props: ActTagChipProps) => {
  const { isRtp, cursor, classes, label, labelMaxWidth, ...chipProps } = props
  const internalClasses = useStyles({ isRtp, cursor, labelMaxWidth })
  const rootClasses = clsx(internalClasses.chip, { [internalClasses.rtpChip]: isRtp })

  const renderChip = () => (
    <Chip
      classes={{
        root: rootClasses,
        labelSmall: internalClasses.label,
        avatar: internalClasses.avatar,
        ...classes
      }}
      cy-data={isRtp ? 'payout-variant-chip' : 'variant-chip'} // default that can be overriden
      size="small"
      label={<div className={internalClasses.labelDiv}>{label}</div>}
      {...chipProps}
    />
  )

  if (!label) return null

  return (
    <>
      {!props.tooltip ? (
        renderChip()
      ) : (
        <Tooltip title={props.tooltip} placement="bottom-start">
          <div>{renderChip()}</div>
        </Tooltip>
      )}
    </>
  )
}

export default ActTagChip
